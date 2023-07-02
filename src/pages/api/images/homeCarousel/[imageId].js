import ImageHomeCarousel from "@/api/db/models/ImageHomeCarousel";
import auth from "@/api/middlewares/auth";
import checkIsAdmin from "@/api/middlewares/checkIsAdmin";
import slowDown from "@/api/middlewares/slowDown";
import validate from "@/api/middlewares/validate";
import mw from "@/api/mw";
import { boolValidator, idValidator, stringValidator } from "@/validator";
import { deleteImageFromS3 } from "@/web/services/S3";

const handler = mw({
  PATCH: [
    slowDown(500),
    auth(),
    checkIsAdmin(),
    validate({
      query: {
        imageId: idValidator.required(),
      },
      body: {
        visible: boolValidator.required()
      }
    }),
    async({
      locals: {
        query: { imageId },
        body: { visible }
      },
      res
    }) => {
      const id = imageId;

      try {
        const image = await ImageHomeCarousel.query().findOne({ id });

        if (!image) {
          res.status(404).send({ error: "Image not found" });

          return;
        }

        await ImageHomeCarousel.query()
          .patch({
            visible: visible
          })
          .where("id", id)
          .returning("*");
        
        res.send({ status: "success", message: "Image visibility updated successfully." });
      } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
      }
    }
  ],
  POST: [
    slowDown(500),
    auth(),
    checkIsAdmin(),
    validate({
      query: {
        imageId: idValidator.required()
      },
      body: {
        imageName: stringValidator.required()
      }
    }),
    async({
      locals: {
        query: { imageId },
        body: { imageName }
      },
      res
    }) => {
      try {
        await ImageHomeCarousel.query().delete().where("id", imageId);

        await deleteImageFromS3(imageName);

        res.send({ status: "success", message: "Image was deleted successfully from the carousel." });
      } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
      }
    }
  ]
});

export default handler;