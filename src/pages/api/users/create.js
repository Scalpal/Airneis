import hashPassword from "@/api/db/hashPassword.js";
import config from "@/api/config.js";
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
            userId: account.id,
          });
        }
      );

      sgMail.setApiKey(config.security.sendgrid);
      const msg = {
        to: email,
        from: "Airneis.service@gmail.com",
        templateId: "d-97f9566d2ae94701a8172e07cc82de28",
        // eslint-disable-next-line camelcase
        dynamic_template_data: {
          firstname: firstName,
          lastname: lastName,
          url: `http://localhost:3000/mails/confirmation?id=${newUser.userId}`,
        },
      };

      try {
        sgMail.send(msg);
        res.send({ success: true });
      } catch (error) {
        res.status(404).send({ success: error });
      }
    },
  ],
});

export default handler;
