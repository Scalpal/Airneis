import config from "@/api/config.js";
import UserModel from "@/api/db/models/UserModel.js";
import validate from "@/api/middlewares/validate.js";
import mw from "@/api/mw.js";
import { emailValidator } from "@/validator";
import sgMail from "@sendgrid/mail";
import { AES } from "crypto-js";

const handler = mw({
  GET: [
    validate({
      query: {
        email: emailValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { email },
      },
      res,
    }) => {
      console.log(email);
      const user = await UserModel.query().findOne({ email });

      if (!user) {
        res.status(404).send({ error: "Email not found" });

        return;
      }

      const encryptId = (props) => {
        const encryptedId = AES.encrypt(
          props.toString(),
          config.security.encrypt
        ).toString();
        return encryptedId;
      };

      sgMail.setApiKey(config.security.sendgrid);
      const msg = {
        to: email,
        from: "Airneis.service@gmail.com",
        templateId: "d-fddb8f38b1444266996c99653de3170d",
        // eslint-disable-next-line camelcase
        dynamic_template_data: {
          firstname: user.firstName,
          lastname: user.lastName,
          url: `${
            config.baseURL
          }/mails/reset-password?keyA=${encodeURIComponent(
            encryptId(user.id)
          )}&keyB=${encodeURIComponent(encryptId(new Date().toISOString()))}`,
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
