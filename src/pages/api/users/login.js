import config from "@/api/config.js";
import UserModel from "@/api/db/models/UserModel.js";
import slowDown from "@/api/middlewares/slowDown.js";
import validate from "@/api/middlewares/validate.js";
import mw from "@/api/mw.js";
import { emailValidator, stringValidator } from "@/validator";
import jsonwebtoken from "jsonwebtoken";

const handler = mw({
  POST: [
    slowDown(500),
    validate({
      body: {
        email: emailValidator.required(),
        password: stringValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { email, password },
      },
      res,
    }) => {
      const user = await UserModel.query()
        .findOne({ email });
      
      if (!user) {
        res.status(401).send({ error: "Wrong email or password." });

        return;
      }

      if (!(await user.checkPassword(password))) {
        res.status(401).send({ error: "Wrong email or password." });

        return;
      }

      if (!user.active) {
        res.status(401).send({ error: "Wrong email or password." });

        return;
      }

      const jwt = jsonwebtoken.sign({
        payload: {
          user: {
            id: user.id,
          },
        },
      },
      config.security.jwt.secret,
      { expiresIn: config.security.jwt.expiresIn }
      );
    
      res.send({ result: jwt });
    },
  ],
});

export default handler;
