import ImageHomeCarousel from "@/api/db/models/ImageHomeCarousel";
import slowDown from "@/api/middlewares/slowDown";
import validate from "@/api/middlewares/validate";
import mw from "@/api/mw";
import { boolValidator } from "@/validator";
import getImagesWithSignedUrl from "@/web/services/images/getImagesWithSignedUrl";

const handler = mw({
  GET: [
    slowDown(500),
    validate({
      query: {
        visible: boolValidator.default(false)
      }
    }),
    async ({ req, res }) => {
      const query = ImageHomeCarousel.query();

      if (req.query.visible === "true") {
        query.where("visible", true);
      }

      try {
        const response = await query.select("*").orderBy("id");

        const imagesWithSignedUrl = await getImagesWithSignedUrl(response);

        res.send({ images: imagesWithSignedUrl });
      } catch (error) {
        res.status(500).send({ error: error });
      }
    }
  ]
});

export default handler;