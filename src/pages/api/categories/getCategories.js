import CategoryModel from "@/api/db/models/CategoryModel";
import mw from "@/api/mw.js";

const products = mw({
  GET: [
    async ({ res }) => {
      
      const result = await CategoryModel.query();

      res.send({
        result,
      });
    },
  ],
});

export default products;
