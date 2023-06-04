import CategoryModel from "@/api/db/models/CategoryModel"
import mw from "@/api/mw.js"
import validate from "@/api/middlewares/validate"
import { pageValidator, limitValidator } from "@/validator"

const products = mw({
  GET: [
    validate({
      query: {
        limit: limitValidator.default(100),
        page: pageValidator.default(1),
      },
    }),
    async ({
      locals: {
        query: { limit, page },
      },
      res,
    }) => {
      const query = CategoryModel.query()

      const [{ count }] = await query.clone().limit(1).offset(0).count()
      const totalCount = parseInt(count, 10)

      const products = await query.modify("paginate", { limit, page })

      res.send({
        result: products,
        meta: {
          totalCount,
        },
      })
    },
  ],
})

export default products
