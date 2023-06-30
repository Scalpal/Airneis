import UserModel from "@/api/db/models/UserModel.js";
import auth from "@/api/middlewares/auth";
import checkIsAdmin from "@/api/middlewares/checkIsAdmin";
import slowDown from "@/api/middlewares/slowDown.js";
import validate from "@/api/middlewares/validate";
import mw from "@/api/mw.js";
import { limitValidator, orderFieldValidator, orderValidator, pageValidator, searchValidator } from "@/validator";

const handler = mw({
  GET: [
    slowDown(500),
    auth(),
    checkIsAdmin(),
    validate({
      query: {
        limit: limitValidator.default(10),
        page: pageValidator,
        orderField: orderFieldValidator(["id", "firstName", "lastName"]).default("id"),
        order: orderValidator.default("asc"),
        search: searchValidator
      }
    }),
    async ({
      locals: {
        query: { limit, page, orderField, order, search}
      },
      res
    }) => {
      try {
        const searchValue = search.toLowerCase(); 
        const query = UserModel.query();

        if (orderField) {
          query.orderBy(orderField, order); 
        }

        if (search) {
          query
            .whereRaw("LOWER(\"firstName\") LIKE ?", `%${searchValue}%`)
            .orWhereRaw("LOWER(\"lastName\") LIKE ?", `%${searchValue}%`)
            .orWhereRaw("LOWER(\"email\") LIKE ?", `%${searchValue}%`);
        }

        const countQuery = query.clone();
        const [{ count }] = await countQuery.clearSelect().clearOrder().count();

        const users = await query.modify("paginate", limit, page)
          .select("id", "email", "firstName", "lastName", "phoneNumber", "active", "isAdmin")
          .withGraphFetched("address");

        res.send({ users: users, count: count });
      } catch (error) {
        res.status(500).send({ error: error });
      }
    }
  ]
});

export default handler; 