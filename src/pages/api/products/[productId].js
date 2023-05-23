import ProductImageModel from "@/api/db/models/ProductImageModel"
import ProductMaterialRelationModel from "@/api/db/models/ProductMaterialRelationModel"
import ProductModel from "@/api/db/models/ProductModel"
import auth from "@/api/middlewares/auth"
import checkIsAdmin from "@/api/middlewares/checkIsAdmin"
import slowDown from "@/api/middlewares/slowDown"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { idValidator, numberValidator, stringValidator } from "@/validator"

const handler = mw({
  GET: [
    auth(),
    validate({
      query: {
        productId: idValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { productId },
      },
      res,
    }) => {
      const id = productId

      const product = await ProductModel.query()
        .findOne({ id })
        .select("id", "name", "description", "price", "stock")
        .withGraphFetched("category")
        .withGraphFetched("materials")

      if (!product) {
        res.status(404).send({ error: "Product not found" })

        return
      }

      res.send({ product: product })
    },
  ],
  PATCH: [
    slowDown(500),
    auth(),
    checkIsAdmin(),
    validate({
      query: {
        productId: idValidator,
      },
      body: {
        name: stringValidator,
        description: stringValidator,
        price: numberValidator,
        stock: numberValidator,
        categoryId: numberValidator,
      },
    }),
    async ({
      locals: {
        query: { productId },
        body: { name, description, price, stock, categoryId },
      },
      res,
    }) => {
      const id = productId

      res.send({ status: "success", message: "Product edited successfully." })
    },
  ],
  DELETE: [
    slowDown(500),
    auth(),
    checkIsAdmin(),
    validate({
      query: {
        productId: idValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { productId },
      },
      res,
    }) => {
      const id = productId

      const product = await ProductModel.query().findOne({ id })

      if (!product) {
        res.status(404).send({ error: "Product not found" })

        return
      }

      await ProductMaterialRelationModel.query().delete().where("productId", id)

      await ProductImageModel.query().delete().where("productId", id)

      await ProductModel.query().delete().where("id", id)

      res.send({ status: "success", message: "Product deleted successfully" })
    },
  ],
})

export default handler
