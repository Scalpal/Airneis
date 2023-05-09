import UserModel from "@/api/db/models/UserModel";
import slowDown from "@/api/middlewares/slowDown";
import mw from "@/api/mw.js";
import jsonwebtoken from "jsonwebtoken";
import config from "@/api/config";

const handler = mw({
  GET: [
    slowDown(500),
    async ({
      req,
      res
    }) => {
      const token = req.headers.authorization.slice(7);
      const { payload: { user: { id } } } = jsonwebtoken.verify(token, config.security.jwt.secret);

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

        res.send({ user: user });

      } catch (error) {
        console.log(error); 
      }
    }
  ],
});

export default handler; 