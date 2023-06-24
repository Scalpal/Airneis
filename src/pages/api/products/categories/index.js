import CategoryModel from "@/api/db/models/CategoryModel";
import slowDown from "@/api/middlewares/slowDown";
import mw from "@/api/mw";
import getImageWithSignedUrl from "@/web/services/images/getImageWithSignedUrl";


const handler = mw({
  GET: [
    slowDown(500),
    async ({
      res
    }) => {
      try {
        const categories = await CategoryModel.query().select("*").orderBy("id");

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