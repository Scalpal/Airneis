import CategoryModel from "@/api/db/models/CategoryModel";
import slowDown from "@/api/middlewares/slowDown";
import validate from "@/api/middlewares/validate";
import mw from "@/api/mw";
import { boolValidator } from "@/validator";
import getImageWithSignedUrl from "@/web/services/images/getImageWithSignedUrl";


const handler = mw({
  GET: [
    slowDown(500),
    validate({
      query: {
        visible: boolValidator,
        visibleInHome: boolValidator
      }
    }),
    async ({
      locals: {
        query: { visible, visibleInHome }
      },
      res
    }) => {
      const query = CategoryModel.query();

      if (visible === true) {
        query.where("visible", true); 
      }

      if (visibleInHome === true) {
        query.where("visibleInHome", true);
      }
      
      try {
        const categories = await query.select("*")
          // .orderBy("id");
          .orderBy("visibleInHome", "desc");


        const categoriesWithSignedUrl = await Promise.all(categories.map(async (category) => {
          const signedImageUrl = await getImageWithSignedUrl(category.imageSrc);

          category.imageUrl = signedImageUrl;

          return category;
        }));

        res.send({ categories: categoriesWithSignedUrl });
      } catch (error) {
        res.status(500).send({ error: error });
      }
    }
  ]
});

export default handler; 