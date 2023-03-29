import hashPassword from "@/api/db/hashPassword.js"
import UserModel from "@/api/db/models/UserModel.js"
const { transaction } = require("objection")
import RoleModel from "@/api/db/models/RoleModel.js"
import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import {
  displayNameValidator,
  emailValidator,
  passwordValidator,
  phoneValidator,
  roleValidator,
} from "@/validators.js"
import cors from "@/pages/api/cors.js"

const handler = mw({
  POST: [
    validate({
      body: {
        firstName: displayNameValidator.required(),
        lastName: displayNameValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required(),
        phoneNumber: phoneValidator.required(),
        role: roleValidator,
      },
    }),
    async ({
      locals: {
        body: { firstName, lastName, email, password, role, phoneNumber },
      },
      res,
      req,
    }) => {
      const user = await UserModel.query().findOne({ email })

      if (user) {
        res.send({ result: true })

        return
      }

      const [passwordHash, passwordSalt] = await hashPassword(password)

      await transaction(UserModel, RoleModel, async (UserModel, RoleModel) => {
        const account = await UserModel.query().insert({
          firstName,
          lastName,
          email,
          passwordHash,
          passwordSalt,
          phoneNumber,
        })

        return RoleModel.query().insert({
          usersId: account.id,
          role,
        })
      })

      res.send({ success: true })
    },
  ],
})

export default cors(handler)
