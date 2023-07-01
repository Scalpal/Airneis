import ProductImageModel from "@/api/db/models/ProductImageModel";
import ProductMaterialRelationModel from "@/api/db/models/ProductMaterialRelationModel";
import ProductModel from "@/api/db/models/ProductModel";
import auth from "@/api/middlewares/auth";
import checkIsAdmin from "@/api/middlewares/checkIsAdmin";
import slowDown from "@/api/middlewares/slowDown";
import validate from "@/api/middlewares/validate";
import mw from "@/api/mw";
import { arrayValidator, boolValidator, idValidator, numberValidator, stringValidator } from "@/validator";
import getProductsAverageRating from "@/web/services/products/getProductsAverageRating";
import getProductsImagesWithSignedUrls from "@/web/services/products/getProductsImagesWithSignedUrl";

const handler = mw({
  GET: [
    slowDown(500),
    validate({
      query: {
        productId: idValidator.required()
      }
    }),
    async({
      locals: {
        query: { productId }
      },
      res
    }) => {
      const id = productId;

      try {
        const product = await ProductModel.query()
          .findOne({ id })
          .select("id", "name", "description", "price", "stock")
          .withGraphFetched("category")
          .withGraphFetched("materials")
          .withGraphFetched("reviews")
          .withGraphFetched("productImages");

        if (!product) {
          res.status(404).send({ error: "Product not found" });

          return;
        }

        // Products with average rating
        const productWithAverageRating = getProductsAverageRating([product]); 
        
        // Add signed url to all products images
        const productWithSignedUrlImages = await getProductsImagesWithSignedUrls(productWithAverageRating);

        res.send({ product: productWithSignedUrlImages[0] });
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
      query: { 
        productId: idValidator
      },
      body: {
        name: stringValidator,
        description: stringValidator,
        price: numberValidator,
        stock: numberValidator,
        categoryId: numberValidator,
        materials: arrayValidator,
        showInHome: boolValidator
      }
    }), 
    async({
      locals: {
        query: { productId },
        body: { name, description, price, stock, categoryId, materials, showInHome }
      }, 
      res
    }) => {
      const id = productId;
      
      try {
        const product = await ProductModel.query().findOne({ id }).withGraphFetched("materials");

        if (!product) {
          res.status(404).send({ status: 404, message: "Product not found" }); 

          return;
        }

        if (materials) {
          const productMaterialIds = product.materials.reduce((acc, { id }) => [...acc, id], []);
          
          // Add new materials
          const materialsToAdd = materials.map((id) => {
            const materialId = Number.parseInt(id);

            if (!productMaterialIds.includes(materialId)) {
              return { productId: Number.parseInt(productId), materialId: materialId };
            } 
          }).filter(elt => elt !== undefined);

          if (materialsToAdd.length > 0) {
            await ProductMaterialRelationModel.query().insert(materialsToAdd).returning("*");
          }

          // Delete materials
          const materialsToDelete = productMaterialIds.map((id) => {
            const materialsIdsInt = materials.reduce((acc, id) => [...acc, Number.parseInt(id)], []);
            const materialId = Number.parseInt(id);

            if (!materialsIdsInt.includes(materialId)) {
              return materialId;
            }
          }).filter(elt => elt !== undefined);

          if (materialsToDelete.length > 0) {
            await ProductMaterialRelationModel.query()
              .delete()
              .whereIn("materialId", materialsToDelete)
              .andWhere("productId", id)
              .returning("*");
          }
        }

        const updatedProduct = await ProductModel.query()
          .patch({
            ...(name ? { name } : {}),
            ...(description ? { description } : {}),
            ...(price ? { price } : {}),
            ...(stock ? { stock } : {}),
            ...(categoryId ? { categoryId } : {}),
            ...(showInHome !== null ? { showInHome } : {})
          })
          .where("id", id)
          .returning("*")
          .withGraphFetched("materials")
          .withGraphFetched("category")
          .withGraphFetched("reviews")
          .withGraphFetched("productImages");
                        
        // Products with average rating
        const productWithAverageRating = getProductsAverageRating([updatedProduct[0]]); 
        
        // Add signed url to all products images
        const productWithSignedUrlImages = await getProductsImagesWithSignedUrls(productWithAverageRating);

        res.send({ status: "success", message: "Product edited successfully.", product: productWithSignedUrlImages[0]});
      } catch (error) {
        res.status(500).send({ error: error });
      }
    }
  ],
  DELETE: [
    slowDown(500), 
    auth(),
    checkIsAdmin(),
    validate({ 
      query: { 
        productId: idValidator.required()
      }
    }), 
    async({
      locals: {
        query: {
          productId
        }
      },
      res
    }) => {
      const id = productId;

      const product = await ProductModel.query().findOne({ id });

      if (!product) {
        res.status(404).send({ error: "Product not found" });

        return;
      }

      await ProductMaterialRelationModel.query()
        .delete()
        .where("productId", id);
      
      await ProductImageModel.query()
        .delete()
        .where("productId", id);
      
      await ProductModel.query()
        .delete()
        .where("id", id);

      res.send({ status: "success", message: "Product deleted successfully" }); 
    }
  ]
});

export default handler;