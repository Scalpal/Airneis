import ProductModel from "@/api/db/models/ProductModel";
import ReviewModel from "@/api/db/models/ReviewModel";
import slowDown from "@/api/middlewares/slowDown";
import validate from "@/api/middlewares/validate";
import mw from "@/api/mw";
import { limitValidator, pageValidator, stringValidator } from "@/validator";

const handler = mw({
  GET: [
    slowDown(500),
    validate({
      query: {
        productSlug: stringValidator.required(),
        limit: limitValidator.default(1),
        page: pageValidator,
      }
    }),
    async ({
      locals: {
        query: { productSlug, limit, page }
      },
      res
    }) => {
      const slug = productSlug;
      const query = ReviewModel.query();

      try {
        const product = await ProductModel.query().findOne({ slug });

        const countQuery = query.clone();
        const [{ count }] = await countQuery.clearSelect().clearOrder().count();

        const reviews = await query.modify("paginate", limit, page)
          .select("*")
          .where("productId", product.id)
          .withGraphFetched("user");

        res.send({ reviews: reviews, count: Number.parseInt(count) });
      } catch (error) {
        res.status(500).send({ error: error });
      }
    }
  ]
});

export default handler; 