import ProductModel from "@/api/db/models/ProductModel";
import mw from "@/api/mw.js";

const products = mw({
  GET: [
    async ({ res }) => {
      const result = await ProductModel.query()
        .withGraphFetched("category")
        .withGraphFetched("materials");
  
      res.send({ result });
    },
  ],
});

export default products;
