import ProductImageModel from "@/api/db/models/ProductImageModel"
import ProductModel from "@/api/db/models/ProductModel"
import auth from "@/api/middlewares/auth"
import checkIsAdmin from "@/api/middlewares/checkIsAdmin"
import slowDown from "@/api/middlewares/slowDown"
import mw from "@/api/mw"
import { uploadImageToS3 } from "@/web/services/S3"
import getProductsAverageRating from "@/web/services/products/getProductsAverageRating"
import getProductsImagesWithSignedUrls from "@/web/services/products/getProductsImagesWithSignedUrl"
import multer from "multer"

export const config = {
  api: {
    bodyParser: false,
  },
}

const upload = multer({
  storage: multer.memoryStorage(),
}).single("file")

const handler = mw({
  POST: [
    slowDown(500),
    auth(),
    checkIsAdmin(),
    async ({ req, res }) => {
      upload(req, res, async (err) => {
        if (err) {
          res.status(500).send({ error: err })

          return
        }

        const productId = parseInt(req.query.productId)

        try {
          const uploadedImage = await uploadImageToS3(
            req.file,
            "products-images/"
          )

          await ProductImageModel.query()
            .insert({
              productId: productId,
              imageSrc: uploadedImage.Key,
            })
            .returning("*")

          const updatedProduct = await ProductModel.query()
            .findOne({ id: productId })
            .withGraphFetched("category")
            .withGraphFetched("materials")
            .withGraphFetched("reviews")
            .withGraphFetched("productImages")

          // Products with average rating
          const productWithAverageRating = getProductsAverageRating([
            updatedProduct,
          ])

          // Add signed url to all products images
          const productWithSignedUrlImages =
            await getProductsImagesWithSignedUrls(productWithAverageRating)

          res.send({
            image: uploadedImage.Location,
            product: productWithSignedUrlImages[0],
          })
        } catch (error) {
          res.status(500).send({ error: error })
        }
      })
    },
  ],
})

export default handler
