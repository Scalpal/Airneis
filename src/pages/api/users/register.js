import hashPassword from "@/api/db/hashPassword";
import AddressModel from "@/api/db/models/AddressModel";
import UserModel from "@/api/db/models/UserModel.js";
import slowDown from "@/api/middlewares/slowDown.js";
import validate from "@/api/middlewares/validate.js";
import mw from "@/api/mw.js";
import { emailValidator, phoneValidator, stringValidator, passwordValidator } from "@/validator";
import sgMail from "@sendgrid/mail";
import config from "@/api/config.js";

const handler = mw({
  POST: [
    slowDown(500),
    validate({
      body: {
        firstName: stringValidator.required(),
        lastName: stringValidator.required(),
        phoneNumber: phoneValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required(),
        address: stringValidator,
        city: stringValidator,
        region: stringValidator,
        postalCode: stringValidator,
        country: stringValidator, 
      },
    }),
    async ({
      locals: {
        body: { firstName, lastName, phoneNumber, email, password, address, city, region, postalCode, country },
      },
      res,
    }) => {
      const user = await UserModel.query().findOne({ email }); 
      
      if (user) {
        res.status(409).send({ error: "Email already used." });

        return;
      }

      const [passwordHash, passwordSalt] = await hashPassword(password);

      const addedUser = await UserModel.query()
        .insert({
          email,
          firstName,
          lastName,
          passwordHash,
          passwordSalt,
          phoneNumber,
        })
        .returning("*");

      if (address !== "" && city !== "" && region !== "" && postalCode !== "" && country !== "") {
        await AddressModel.query()
          .insert({
            address,
            city,
            region,
            postalCode,
            country,
            userId : addedUser.id,
          })
          .returning("*");
      }

      sgMail.setApiKey(config.security.sendgrid);

      const msg = {
        to: email,
        from: "Airneis.service@gmail.com",
        templateId: "d-97f9566d2ae94701a8172e07cc82de28",
        // eslint-disable-next-line camelcase
        dynamic_template_data: {
          firstname: firstName,
          lastname: lastName,
          url: `http://localhost:3000/mails/confirmation?id=${addedUser.id}`,
        },
      };

      try {
        sgMail.send(msg);
        res.send({ success: true });
      } catch (error) {
        res.status(404).send({ error: error });
      }
    },
  ],
});

export default handler;
