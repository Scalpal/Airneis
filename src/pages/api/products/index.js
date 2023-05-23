import ProductMaterialRelationModel from "@/api/db/models/ProductMaterialRelationModel"
import ProductModel from "@/api/db/models/ProductModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  arrayOrStringValidator,
  boolValidator,
  categoriesValidator,
  limitValidator,
  materialsValidator,
  numberValidator,
  orderFieldValidator,
  orderValidator,
  pageValidator,
  searchValidator,
  testValidator,
} from "@/validator"

const handler = mw({
  GET: [
    validate({
      query: {
        priceMin: numberValidator,
        priceMax: numberValidator,
        materials: arrayOrStringValidator,
        onlyInStock: boolValidator.default(false),
        categories: arrayOrStringValidator,
        limit: limitValidator,
        page: pageValidator,
        orderField: orderFieldValidator([
          "id",
          "name",
          "price",
          "stock",
        ]).default("id"),
        order: orderValidator.default("asc"),
        search: searchValidator,
      },
    }),
    async ({
      locals: {
        query: {
          priceMin,
          priceMax,
          materials,
          onlyInStock,
          categories,
          limit,
          page,
          orderField,
          order,
          search,
        },
      },
      res,
    }) => {
      const materialsArray = Array.isArray(materials) ? materials : [materials]
      const categoriesArray = Array.isArray(categories)
        ? categories
        : [categories]

      const searchValue = search.toLowerCase()
      const query = ProductModel.query()

      if (orderField) {
        query.orderBy(orderField, order)
      }

      if (search) {
        query.whereRaw('LOWER("name") LIKE ?', `%${searchValue}%`)
      }

      if (priceMin) {
        query.where("price", ">", priceMin)
      }

      if (priceMax) {
        query.where("price", "<", priceMax)
      }

      if (categories) {
        query.whereIn("categoryId", categoriesArray)
      }

      if (materials) {
        const materialsProducts = await ProductMaterialRelationModel.query()
          .select("productId")
          .whereIn("materialId", materialsArray)

        const productIds = materialsProducts.reduce(
          (acc, { productId }) => [...acc, productId],
          []
        )

        query.whereIn("id", productIds)
      }

      if (onlyInStock === true) {
        query.where("stock", ">", 0)
      }

      const [countResult] = await query
        .clearSelect()
        .clearOrder()
        .limit(1)
        .offset(0)
        .count()

      const count = Number.parseInt(countResult.count, 10)

      const products = await query
        .modify("paginate", limit, page)
        .select("id", "name", "description", "price", "stock")
        .withGraphFetched("category")
        .withGraphFetched("materials")

      res.send({
        products,
        meta: {
          count,
        },
      })
    },
  ],
})

export default handler
