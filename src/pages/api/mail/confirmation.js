import UserModel from "@/api/db/models/UserModel.js";
import validate from "@/api/middlewares/validate.js";
import mw from "@/api/mw.js";
import { idValidator } from "@/validator";

const handler = mw({
  PATCH: [
    validate({
      body: {
        id: idValidator.required(),
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
        res.status(404).send({ result: "User undefined" });

        return;
      }

      await UserModel.query().findOne({ id }).update({ active: true });

      res.send({ success: true });
    },
  ],
});

export default handler;
