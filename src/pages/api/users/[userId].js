import AddressModel from "@/api/db/models/AddressModel";
import UserModel from "@/api/db/models/UserModel";
import auth from "@/api/middlewares/auth";
import checkIsAdmin from "@/api/middlewares/checkIsAdmin";
import slowDown from "@/api/middlewares/slowDown";
import validate from "@/api/middlewares/validate";
import mw from "@/api/mw.js";
import { boolValidator, stringValidator } from "@/validator";
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
        query: { userId },
      },
      res
    }) => {
      const id = Number.parseInt(userId);

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
    async({
      locals: {
        query: { userId } 
      },
      res
    }) => {
      const user = await UserModel.query().findById(userId);
      
      if (!user) {
        res.status(404).send({ error: "User not found" }); 

        return; 
      }

      await AddressModel.query().delete().where({ userId: userId });

      const deletedUser = await UserModel.query()
        .delete()
        .where({ id: userId })
        .returning("*"); 
      
      res.send({ status: "success" ,message: `User ${deletedUser[0].id} successfully deleted` }); 
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
        active: boolValidator,
        isAdmin: boolValidator
      }
    }),
    async({
      locals: {
        query: { userId },
        body: { firstName, lastName, active, isAdmin }
      },
      res
    }) => {
      const user = await UserModel.query().findById(userId);
      
      if (!user) {
        res.status(404).send({ error: "User not found" }); 

        return; 
      }

      console.log("active : ", active);
      console.log("isAdmin : ", isAdmin);

      const updatedUser = await UserModel.query()
        .patch({
          ...(firstName ? { firstName } : {}),
          ...(lastName ? { lastName } : {}),
          ...(active !== undefined ? { active } : {}),
          ...(isAdmin !== undefined ? { isAdmin } : {})
        })
        .where({ id: userId })
        .returning("*");
      
      res.send({ status: "success", message: `User ${updatedUser[0].id} updated successfully`});
    }
  ]
});

export default handler; 