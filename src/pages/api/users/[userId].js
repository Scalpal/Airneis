import UserModel from "@/api/db/models/UserModel";
import slowDown from "@/api/middlewares/slowDown";
import validate from "@/api/middlewares/validate";
import mw from "@/api/mw.js";
import { idValidator } from "@/validator";

const handler = mw({
  GET: [
    slowDown(500),
    validate({
      query: {
        userId: idValidator.required()
      }
    }),
    async ({
      locals: {
        query: { userId },
      },
      res
    }) => {
      const id = Number.parseInt(userId);

      const user = await UserModel.query().findOne({ id });

      if (!user) {
        res.status(404).send({ error: "User not found" });
 
        return; 
      }

      res.send({ user: user });
    }
  ],
});

export default handler; 