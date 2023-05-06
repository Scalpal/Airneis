import UserModel from "@/api/db/models/UserModel.js";
import checkIsAdmin from "@/api/middlewares/checkIsAdmin";
import slowDown from "@/api/middlewares/slowDown.js";
import mw from "@/api/mw.js";


const handler = mw({
  GET: [
    slowDown(500),
    checkIsAdmin(),
    async ({
      res
    }) => {
      const users = await UserModel.query()
        .select(
          "id as ID",
          "email as E-mail",
          "firstName as First name",
          "lastName as Last name",
          "phoneNumber as Phone number",
          "active as Active",
          "isAdmin"
        ); 

      res.send({ users: users });
    }
  ]
});

export default handler; 