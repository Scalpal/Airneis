import MaterialModel from "@/api/db/models/MaterialModel";
import slowDown from "@/api/middlewares/slowDown";
import mw from "@/api/mw";


const handler = mw({
  GET: [
    slowDown(500),
    async ({
      res
    }) => {
      const materials = await MaterialModel.query().select("*");

      res.send({ materials: materials });
    }
  ]
});

export default handler; 