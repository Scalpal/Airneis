import hashPassword from "@/api/db/hashPassword";
import UserModel from "@/api/db/models/UserModel.js";
import slowDown from "@/api/middlewares/slowDown.js";
import validate from "@/api/middlewares/validate.js";
import mw from "@/api/mw.js";
import { emailValidator, phoneValidator, stringValidator, passwordValidator } from "@/validator";

const handler = mw({
  POST: [
    slowDown(500),
    validate({
      body: {
        firstName: stringValidator.required(),
        lastName: stringValidator.required(),
        phoneNumber: phoneValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required()
      },
    }),
    async ({
      locals: {
        body: { firstName, lastName, phoneNumber, email, password },
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

      res.send({ result: addedUser });
    },
  ],
});

export default handler;
