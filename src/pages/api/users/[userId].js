import UserModel from "@/api/db/models/UserModel";
import auth from "@/api/middlewares/auth";
import checkIsAdmin from "@/api/middlewares/checkIsAdmin";
import slowDown from "@/api/middlewares/slowDown";
import validate from "@/api/middlewares/validate";
import mw from "@/api/mw.js";
import {
  boolValidator,
  emailValidator,
  phoneValidator,
  stringValidator
} from "@/validator";
import { idValidator } from "@/validator";

const handler = mw({
  GET: [
    slowDown(500),
    auth(),
    checkIsAdmin(),
    validate({
      query: {
        userId: idValidator.required()
      }
    }),
    async ({
      locals: {
        query: { userId }
      },
      res
    }) => {
      const id = Number.parseInt(userId);

      try {
        const user = await UserModel.query()
          .select(
            "id",
            "email",
            "firstName",
            "lastName",
            "phoneNumber",
            "active",
            "isAdmin"
          )
          .findOne({ id })
          .withGraphFetched("address");

        if (!user) {
          res.status(404).send({ error: "User not found" });

          return;
        }

        res.send({ user: user });
      } catch (error) {
        res.status(500).send({ error: error });
      }
    }
  ],
  DELETE: [
    slowDown(500),
    auth(),
    checkIsAdmin(),
    validate({
      query: {
        userId: idValidator.required()
      }
    }),
    async ({
      locals: {
        query: { userId }
      },
      res
    }) => {
      try {
        const user = await UserModel.query().findById(userId);

        if (!user) {
          res.status(404).send({ error: "User not found" });

          return;
        }

        const desactivatedUser = await UserModel.query()
          .patch({ active: false })
          .where({ id: userId })
          .returning("*");

        res.send({
          status: "success",
          message: `User ${desactivatedUser[0].id} successfully desactivated`
        });
      } catch (error) {
        res.status(500).send({ error: error });
      }
    }
  ],
  PATCH: [
    slowDown(500),
    auth(),
    checkIsAdmin(),
    validate({
      query: {
        userId: idValidator.required()
      },
      body: {
        firstName: stringValidator,
        lastName: stringValidator,
        email: emailValidator,
        phoneNumber: phoneValidator,
        active: boolValidator,
        isAdmin: boolValidator
      }
    }),
    async ({
      locals: {
        query: { userId },
        body: { firstName, lastName, email, phoneNumber, active, isAdmin }
      },
      res
    }) => {
      try {
        const user = await UserModel.query().findById(userId);

        if (!user) {
          res.status(404).send({ error: "User not found" });

          return;
        }

        const updatedUser = await UserModel.query()
          .patch({
            ...(firstName ? { firstName } : {}),
            ...(lastName ? { lastName } : {}),
            ...(email ? { email } : {}),
            ...(phoneNumber ? { phoneNumber } : {}),
            ...(active !== undefined ? { active } : {}),
            ...(isAdmin !== undefined ? { isAdmin } : {})
          })
          .where({ id: userId })
          .returning("*");

        res.send({
          status: "success",
          message: `User ${updatedUser[0].id} updated successfully`,
          user: updatedUser[0]
        });
      } catch (error) {
        res.status(500).send({ error: error });
      }
    }
  ]
});

export default handler;
