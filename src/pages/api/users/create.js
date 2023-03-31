import hashPassword from "@/api/db/hashPassword.js";
import UserModel from "@/api/db/models/UserModel.js";
const { transaction } = require("objection");
import RoleModel from "@/api/db/models/RoleModel.js";
import validate from "@/api/middlewares/validate.js";
import mw from "@/api/mw.js";
import {
  displayNameValidator,
  emailValidator,
  passwordValidator,
  phoneValidator,
} from "@/validator";
import sgMail from "@sendgrid/mail";

const handler = mw({
  POST: [
    validate({
      body: {
        firstName: displayNameValidator.required(),
        lastName: displayNameValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required(),
        phoneNumber: phoneValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { firstName, lastName, email, password, phoneNumber },
      },
      res,
    }) => {
      const user = await UserModel.query().findOne({ email });

      if (user) {
        res.send({ result: true });

        return;
      }

      const [passwordHash, passwordSalt] = await hashPassword(password);

      const newUser = await transaction(
        UserModel,
        RoleModel,
        async (UserModel, RoleModel) => {
          const account = await UserModel.query().insert({
            firstName,
            lastName,
            email,
            passwordHash,
            passwordSalt,
            phoneNumber,
          });

          return RoleModel.query().insert({
            usersId: account.id,
          });
        }
      );

      sgMail.setApiKey(process.env.SendGridKey);
      const msg = {
        to: email,
        from: "airneis.supdevinci@gmail.com",
        templateId: "d-9efeba00362b4087b9d10a892ce38e64",
        // eslint-disable-next-line camelcase
        dynamic_template_data: {
          firstname: firstName,
          lastname: lastName,
          url: `http://localhost:3000/confirmAccount?id=${newUser.usersId}`,
        },
      };

      try {
        sgMail.send(msg);
      } catch (error) {
        console.log(error);
      }

      res.send({ success: true });
    },
  ],
});

export default handler;
