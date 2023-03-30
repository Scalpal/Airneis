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
        access: stringValidator,
      },
    }),
    async ({
      locals: {
        body: { email, password, access },
      },
      res,
    }) => {
      const user = await UserModel.query()
        .findOne({ email })
        .withGraphFetched("role");

      if (!user) {
        res.status(401).send({ error: "Invalid user" });

        return;
      }

      if (!(await user.checkPassword(password))) {
        res.status(401).send({ error: password });

        return;
      }

      if (access === "admin" && user.role.role !== "admin") {
        res.status(404).send({ error: "You are not an admin" });

        return;
      }

      const jwt = jsonwebtoken.sign(
        {
          payload: {
            user: {
              id: user.id,
              role: user.role.role,
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
