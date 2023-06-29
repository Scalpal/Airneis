import UserModel from "@/api/db/models/UserModel.js";
import hashPassword from "@/api/db/hashPassword.js";
import validate from "@/api/middlewares/validate.js";
import mw from "@/api/mw.js";
import {
  idValidator,
  passwordValidator,
  confirmPasswordValidator,
  stringValidator,
} from "@/validator";

const handler = mw({
  PATCH: [
    validate({
      body: {
        id: idValidator.required(),
        password: passwordValidator.required(),
        passwordConfirmation: confirmPasswordValidator.required(),
        timer: stringValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { id, password, passwordConfirmation, timer },
      },
      res,
    }) => {
      if (password !== passwordConfirmation) {
        res.status(400).send({ error: "Password need to be conform." });

        return;
      }

      const timerNow = new Date();
      timerNow.setMinutes(timerNow.getMinutes() - 15);

      if (timerNow >= new Date(timer)) {
        res.status(401).send({ error: "Token expired." });

        return;
      }

      const user = await UserModel.query().findOne({ id });

      if (!user) {
        res.status(404).send({ error: "User undefined." });

        return;
      }

      if (!user.resetPassword) {
        res.status(404).send({ error: "User undefined." });

        return;
      }

      const [passwordHash, passwordSalt] = await hashPassword(password);

      await UserModel.query()
        .findOne({ id })
        .update({ passwordHash, passwordSalt });

      res.send({ success: true });
    },
  ],
});

export default handler;
