import CategoryModel from "@/api/db/models/CategoryModel";
import auth from "@/api/middlewares/auth";
import checkIsAdmin from "@/api/middlewares/checkIsAdmin";
import slowDown from "@/api/middlewares/slowDown";
import mw from "@/api/mw";
import { deleteImageFromS3, uploadImageToS3 } from "@/web/services/S3";
import getImageWithSignedUrl from "@/web/services/images/getImageWithSignedUrl";
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

        const categoryId = parseInt(req.query.categoryId); 

        const category = await CategoryModel.query().findOne({id: categoryId});

        if (!category) {
          res.status(404).send({ error: "Category not found." });

          return;
        }

        try {
          await deleteImageFromS3(category.imageSrc);

          const uploadedImage = await uploadImageToS3(req.file, "category-images/");

          const [updatedCategory] = await CategoryModel.query()
            .patch({
              imageSrc: uploadedImage.Key
            })
            .where("id", categoryId)
            .returning("*");
                    
          const signedImageUrl = await getImageWithSignedUrl(updatedCategory.imageSrc);
          updatedCategory.imageUrl = signedImageUrl;

          res.send({ category: updatedCategory, status: "success", message: "Image uploaded successfully" });
        } catch (error) {
          res.status(500).send({ error: error });
        }
      });
    }
  ]
});

export default handler; 