import MaterialModel from "@/api/db/models/MaterialModel"
import slowDown from "@/api/middlewares/slowDown"
import mw from "@/api/mw"


const handler = mw({
  GET: [
    slowDown(500),
    async ({
      res
    }) => {
      try {
        const materials = await MaterialModel.query().select("*")

        res.send({ materials: materials })
      } catch (error) {
        res.status(500).send({ error: error })
      }
    }
  ]
})

export default handler 