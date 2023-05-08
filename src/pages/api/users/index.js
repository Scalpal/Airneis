import UserModel from "@/api/db/models/UserModel.js";
import checkIsAdmin from "@/api/middlewares/checkIsAdmin";
import slowDown from "@/api/middlewares/slowDown.js";
import validate from "@/api/middlewares/validate";
import mw from "@/api/mw.js";
import { limitValidator, orderFieldValidator, orderValidator, pageValidator, searchValidator } from "@/validator";


const handler = mw({
  GET: [
    slowDown(500),
    validate({
      query: {
        limit: limitValidator.default(10),
        page: pageValidator,
        orderField: orderFieldValidator(["id", "firstName", "lastName"]).default("id"),
        order: orderValidator.default("asc"),
        search: searchValidator
      }
    }),
    checkIsAdmin(),
    async ({
      locals: {
        query: { limit, page, orderField, order, search}
      },
      res
    }) => {
      const query = UserModel.query();

      if (orderField) {
        query.orderBy(orderField, order); 
      }

      if (search) {
        query
          .where("firstName", "like", `%${search}%`)
          .orWhere("lastName", "like", `%${search}%`)
          .orWhere("email", "like", `%${search}%`);
      }

      const countQuery = query.clone();
      const [{ count }] = await countQuery.clearSelect().clearOrder().count();

      const users = await query.modify("paginate", limit, page)
        .select(
          "id",
          "email",
          "firstName",
          "lastName",
          "phoneNumber",
          "active",
          "isAdmin"
        );

      res.send({ users: users, count: count });
    }
  ]
});

export default handler; 