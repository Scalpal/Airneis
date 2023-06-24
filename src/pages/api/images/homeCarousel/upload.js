
import ImageHomeCarousel from "@/api/db/models/ImageHomeCarousel";
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

        try {
          const uploadedImage = await uploadImageToS3(req.file, "images-home-carousel/");

          await ImageHomeCarousel.query().insert({
            imageSrc: uploadedImage.Key
          }).returning("*");
          
          res.send({ status: "success", message:"Image added to the carousel successfully." });
        } catch (error) {
          res.status(500).send({ error: error });
        }
      });
    }
  ]
});

export default handler; 