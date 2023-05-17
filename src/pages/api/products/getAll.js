import ProductMaterialRelation from "@/api/db/models/ProductMaterialRelation.js";
import mw from "@/api/mw.js";

const handler = mw({
  GET: [
    async ({ res }) => {
      const products = ProductMaterialRelation.query().withGraphJoined("[product, material.category]")
        .select()
        .omit(["product.categoryId", "material.categoryId"]);
      res.send({ result: products });
    },
  ],
});

export default handler;
