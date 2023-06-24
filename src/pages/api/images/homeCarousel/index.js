import ImageHomeCarousel from "@/api/db/models/ImageHomeCarousel";
import auth from "@/api/middlewares/auth";
import checkIsAdmin from "@/api/middlewares/checkIsAdmin";
import slowDown from "@/api/middlewares/slowDown";
import validate from "@/api/middlewares/validate";
import mw from "@/api/mw";
import { boolValidator, idValidator, stringValidator } from "@/validator";
import { deleteImageFromS3 } from "@/web/services/S3";

const handler = mw({
  GET: [
    slowDown(500),
    validate({
      query: {
        active: boolValidator.default(false)
      }
    }),
    async ({ req, res }) => {
      const query = ImageHomeCarousel.query();

      if (req.query.active === true) {
        query.where("active", true);
      }

      try {
        const response = await query.select("*");

        res.send({ images: response });
      } catch (error) {
        res.status(500).send({ error: error });
      }
    }
  ], 
  PATCH: [
    slowDown(500),
    auth(),
    checkIsAdmin(),
    validate({
      body: {
        id: idValidator.required(),
        imageName: stringValidator.required()
      }
    }),
    async({
      locals: {
        body: { id, imageName }
      },
      res
    }) => {
      try {
        await ImageHomeCarousel.query().delete().where("id", id);

        await deleteImageFromS3(imageName);

        res.send({ status: "success", message: "Image was deleted successfully from the carousel." });
      } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
      }
    }
  ]
});

export default handler;