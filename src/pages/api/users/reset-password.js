import UserModel from "@/api/db/models/UserModel.js";
import hashPassword from "@/api/db/hashPassword.js";
import validate from "@/api/middlewares/validate.js";
import mw from "@/api/mw.js";
const timestring = require("timestring");
import {
  idValidator,
  passwordValidator,
  confirmPasswordValidator,
  dateValidator,
} from "@/validator";

const handler = mw({
  PATCH: [
    validate({
      body: {
        id: idValidator.required(),
        password: passwordValidator.required(),
        passwordConfirmation: confirmPasswordValidator.required(),
        timer: dateValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { id, password, passwordConfirmation, timer },
      },
      res,
    }) => {
      const time = "5m";
      const currentDate = new Date();
      const timerDate = new Date(currentDate.getTime() - timestring(time));

      if (timerDate > new Date(timer)) {
        res.status(404).send({ result: "Token expired" });

        return;
      }

      const user = await UserModel.query().findOne({ id });

      if (!user) {
        res.status(404).send({ result: "User undefined" });

        return;
      }

      // for dosn't have error on passwordConfirmation
      password = passwordConfirmation;
      const [passwordHash, passwordSalt] = await hashPassword(password);

      await UserModel.query()
        .findOne({ id })
        .update({ passwordHash, passwordSalt });

      res.send({ success: true });
    },
  ],
});

export default handler;
