import MaterialModel from "@/api/db/models/MaterialModel"
import mw from "@/api/mw.js"

const products = mw({
  GET: [
    async ({ res }) => {
      const result = await MaterialModel.query()

      res.send({
        result,
      })
    },
  ],
})

export default products
