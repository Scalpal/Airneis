import CategoryModel from "@/api/db/models/CategoryModel";
import slowDown from "@/api/middlewares/slowDown";
import mw from "@/api/mw";


const handler = mw({
  GET: [
    slowDown(500),
    async ({
      res
    }) => {
      try {
        const categories = await CategoryModel.query().select("*");

        res.send({ categories: categories });
      } catch (error) {
        res.status(500).send({ error: error });
      }
    }
  ]
});

export default handler; 