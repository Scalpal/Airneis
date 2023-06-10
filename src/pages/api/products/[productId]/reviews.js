import ReviewModel from "@/api/db/models/ReviewModel";
import slowDown from "@/api/middlewares/slowDown";
import validate from "@/api/middlewares/validate";
import mw from "@/api/mw";
import { idValidator, limitValidator, pageValidator } from "@/validator";

const handler = mw({
  GET: [
    slowDown(500),
    validate({
      query: {
        productId: idValidator.required(),
        limit: limitValidator.default(10),
        page: pageValidator,
      }
    }),
    async ({
      locals: {
        query: { productId, limit, page }
      },
      res
    }) => {
      const query = ReviewModel.query();

      try {
        const reviews = await query.modify("paginate", limit, page)
          .select("*")
          .where("productId", productId);

        res.send({ reviews: reviews });
      } catch (error) {
        res.status(500).send({ error: error });
      }
    }
  ]
});

export default handler; 