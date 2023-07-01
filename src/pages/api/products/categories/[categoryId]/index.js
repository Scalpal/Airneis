import CategoryModel from "@/api/db/models/CategoryModel";
import auth from "@/api/middlewares/auth";
import checkIsAdmin from "@/api/middlewares/checkIsAdmin";
import slowDown from "@/api/middlewares/slowDown";
import validate from "@/api/middlewares/validate";
import mw from "@/api/mw";
import { boolValidator, idValidator, stringValidator } from "@/validator";
import { deleteImageFromS3 } from "@/web/services/S3";
import getImageWithSignedUrl from "@/web/services/images/getImageWithSignedUrl";

const handler = mw({
  PATCH: [
    slowDown(500),
    auth(),
    checkIsAdmin(), 
    validate({
      query: {
        categoryId: idValidator.required()
      },
      body: {
        name: stringValidator,
        visible: boolValidator,
        visibleInHome: boolValidator
      }
    }),
    async({
      locals: {
        query: { categoryId },
        body: { name, visible, visibleInHome }
      },
      res
    }) => {
      const id = categoryId;

      try {
        const category = await CategoryModel.query().findOne({ id });

        if (!category) {
          res.status(404).send({ error: "Category not found." });

          return;
        }

        const [updatedCategory] = await CategoryModel.query()
          .patch({
            name,
            visible, 
            visibleInHome
          })
          .where("id", id)
          .returning("*");

        const imageSignedUrl = await getImageWithSignedUrl(updatedCategory.imageSrc);

        updatedCategory.imageUrl = imageSignedUrl;

        res.send({ category: updatedCategory, status: "success", message: "Category updated successfully." });
      } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
      }
    }
  ], 
  DELETE: [
    slowDown(500),
    auth(),
    checkIsAdmin(), 
    validate({
      query: {
        categoryId: idValidator.required()
      }
    }),
    async({
      locals: {
        query: { categoryId }
      },
      res
    }) => {
      const id = categoryId;

      try {
        const category = await CategoryModel.query().findOne({ id });

        if (!category) {
          res.status(404).send({ error: "Category not found." });

          return;
        }

        await deleteImageFromS3(category.imageSrc);

        await CategoryModel.query().delete().where("id", id).returning("*");

        res.send({ status: "success", message: "Category deleted successfully." });
      } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
      }
    }
  ] 
});

export default handler; 