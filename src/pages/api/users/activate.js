import UserModel from "@/api/db/models/UserModel.js";
import validate from "@/api/middlewares/validate.js";
import mw from "@/api/mw.js";
import { stringValidator } from "@/validator";

const handler = mw({
  PATCH: [
    validate({
      body: {
        id: stringValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { id },
      },
      res,
    }) => {
      const user = await UserModel.query().findOne({ id });

      if (!user) {
        res.status(404).send({
          error: "We cannot activate your account, please retry later",
        });

        return;
      }

      await UserModel.query().findOne({ id }).update({ active: true });

      res.send({ result: "Your account is validate with success" });
    },
  ],
});

export default handler;
