import CategoryModel from "@/api/db/models/CategoryModel";
import slowDown from "@/api/middlewares/slowDown";
import mw from "@/api/mw";


const handler = mw({
  GET: [
    slowDown(500),
    async ({
      res
    }) => {
      const categories = await CategoryModel.query().select("*");

      res.send({ categories: categories });
    }
  ]
});

export default handler; 