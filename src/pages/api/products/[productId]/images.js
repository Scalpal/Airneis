// import ProductImageModel from "@/api/db/models/ProductImageModel";
import ProductImageModel from "@/api/db/models/ProductImageModel";
import auth from "@/api/middlewares/auth";
import checkIsAdmin from "@/api/middlewares/checkIsAdmin";
import slowDown from "@/api/middlewares/slowDown";
import mw from "@/api/mw";
import { uploadImageToS3 } from "@/web/services/S3";
import multer from "multer";

export const config = {
  api: {
    bodyParser: false
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
}).single("file");

const handler = mw({
  POST: [
    slowDown(500),
    auth(),
    checkIsAdmin(),
    async ({ req, res }) => {
      upload(req, res, async (err) => {
        if (err) {
          res.status(500).send({ error: err });

          return;
        } 

        const productId = parseInt(req.query.productId); 

        try {
          const uploadedImage = await uploadImageToS3(req.file, "products-images/");

          await ProductImageModel.query().insert({
            productId: productId,
            imageSrc: uploadedImage.Key
          }).returning("*");

          res.send({ image: uploadedImage.Location });
        } catch (error) {
          res.status(500).send({ error: error });
        }
      });
    }
  ]
});

export default handler; 