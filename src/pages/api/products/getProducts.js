import ProductModel from "@/api/db/models/ProductModel"
import ProductMaterialRelation from "@/api/db/models/ProductMaterialRelation"
import mw from "@/api/mw.js"
import validate from "@/api/middlewares/validate.js"
import {
  indexValidator,
  numberValidator,
  booleanValidator,
  arrayValidator,
  stringValidator,
} from "@/validator"

const products = mw({
  POST: [
    validate({
      body: {
        index: indexValidator.required(),
        range: indexValidator.required(),
        categories: arrayValidator.nullable(),
        materials: arrayValidator.nullable(),
        onlyInStock: booleanValidator.required(),
        priceMax: numberValidator.nullable(),
        priceMin: numberValidator.nullable(),
        searchProduct: stringValidator.nullable(),
      },
    }),
    async ({
      locals: {
        body: {
          index,
          categories,
          materials,
          onlyInStock,
          priceMax,
          priceMin,
          range,
          searchProduct,
        },
      },
      res,
    }) => {
      let query = ProductModel.query().where(
        "price",
        ">=",
        Number.parseInt(priceMin, 10)
      )

      if (searchProduct) {
        query = query.whereRaw('LOWER("name") LIKE ?', [
          `%${searchProduct.toLowerCase()}%`,
        ])
      }

      if (categories?.length > 0) {
        query = query.where((builder) => {
          categories.forEach((id) => {
            builder.orWhere({ categoryId: id })
          })
        })
      }

      if (materials?.length > 0) {
        query.where((builder) => {
          materials.forEach((material) => {
            builder.orWhereExists(function () {
              this.from(ProductMaterialRelation.tableName)
                .whereColumn(
                  `${ProductMaterialRelation.tableName}.productId`,
                  "=",
                  `${ProductModel.tableName}.id`
                )
                .andWhere(
                  `${ProductMaterialRelation.tableName}.materialId`,
                  material
                )
            })
          })
        })
      }

      if (onlyInStock) {
        query = query.where("stock", ">=", 0)
      }

      if (Number.parseInt(priceMax, 10) !== 0) {
        query = query.where("price", "<=", Number.parseInt(priceMax, 10))
      }

      query = query.modify("paginate", range, index)

      const [countResult] = await query.clone().limit(1).offset(0).count()
      const result = await query.withGraphFetched(
        "[category, images, materials]"
      )
      const count = Number.parseInt(countResult.count, 10)
      res.send({
        result: result,
        meta: {
          count,
        },
      })
    },
  ],
})

export default products
