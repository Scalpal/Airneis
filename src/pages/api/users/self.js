import UserModel from "@/api/db/models/UserModel"
import mw from "@/api/mw.js"
import auth from "@/api/middlewares/auth"

const handler = mw({
  GET: [
    auth(),
    async ({ res, locals }) => {
      const id = locals.userId

      try {
        const user = await UserModel.query()
          .select(
            "id",
            "email",
            "firstName",
            "lastName",
            "phoneNumber",
            "active",
            "isAdmin"
          )
          .findOne({ id })
          .withGraphFetched("address")

        res.send({ user: user })
      } catch (error) {
        res.json({ error: "Error." })
      }
    },
  ],
})

export default handler
