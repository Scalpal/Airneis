import UserModel from "@/api/db/models/UserModel.js"
import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { idValidator } from "@/validator"

const handler = mw({
  PUT: [
    validate({
      query: {
        id: idValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { id },
      },
      res,
    }) => {
      const user = await UserModel.query().findOne({ id })

      if (!user) {
        res.status(404).send({ result: "User undefined" })

        return
      }

      await UserModel.query().findOne({ id }).update({ activate: true })

      res.send({ success: true })
    },
  ],
})

export default handler
