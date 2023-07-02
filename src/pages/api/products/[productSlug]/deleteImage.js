import ProductImageModel from "@/api/db/models/ProductImageModel";
import ProductModel from "@/api/db/models/ProductModel";
import auth from "@/api/middlewares/auth";
import checkIsAdmin from "@/api/middlewares/checkIsAdmin";
import slowDown from "@/api/middlewares/slowDown";
import validate from "@/api/middlewares/validate";
import mw from "@/api/mw";
import { idValidator, stringValidator } from "@/validator";
import { deleteImageFromS3 } from "@/web/services/S3";
import getProductsImagesWithSignedUrls from "@/web/services/products/getProductsImagesWithSignedUrl";

const handler = mw({
  PATCH: [
    slowDown(500),
    auth(),
    checkIsAdmin(),
    validate({
      query: {
        productSlug: idValidator.required()
      },
      body: {
        imageName: stringValidator.required()
      }
    }),
    async({
      locals: {
        query: { productSlug },
        body: { imageName }
      },
      res
    }) => {
      const slug = productSlug;

      try {
        const product = await ProductModel.query().findOne({ slug });

        if (!product) {
          res.status(404).send("Product not found");

          return;
        }

        // Delete product image from database
        await ProductImageModel.query()
          .delete()
          .where("productId", product.id)
          .andWhere("imageSrc", imageName)
          .returning("*");
        
        // Delete product image from S3
        await deleteImageFromS3(imageName);

        const updatedProduct = await ProductModel.query()
          .findOne({ id: product.id })
          .select("id", "name", "description", "price", "stock")
          .withGraphFetched("category")
          .withGraphFetched("materials")
          .withGraphFetched("productImages");

        if (!product) {
          res.status(404).send({ error: "Product not found" });

          return;
        }
        
        // Add signed url to all products images
        const productWithSignedUrlImages = await getProductsImagesWithSignedUrls([updatedProduct]);
        
        res.send({ status: "success", message: "Image successfully deleted", product: productWithSignedUrlImages[0] });
      } catch (error) {
        res.status(500).send({ error: error });
      }
    }
  ]
});

export default handler; 