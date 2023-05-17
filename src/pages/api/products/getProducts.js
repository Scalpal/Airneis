import ProductModel from "@/api/db/models/ProductModel";
import mw from "@/api/mw.js";
import validate from "@/api/middlewares/validate.js";
import { pageValidator } from "@/validator";

const products = mw({
  GET: [
    validate({
      query: {
        page: pageValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { page },
      },
      res,
    }) => {
      const query = ProductModel.query().modify("paginate",28,page);
      
      const [countResult] = await query.clone().limit(1).offset(0).count();
      const result = await query.withGraphFetched("[category, images, materials]");
      const count = Number.parseInt(countResult.count,10);
      
      res.send({
        result: result,
        meta: {
          count,
        },
      });
    },
  ],
});

export default products;
