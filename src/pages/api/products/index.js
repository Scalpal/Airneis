import CategoryModel from "@/api/db/models/CategoryModel";
import ProductMaterialRelationModel from "@/api/db/models/ProductMaterialRelationModel";
import ProductModel from "@/api/db/models/ProductModel";
import auth from "@/api/middlewares/auth";
import checkIsAdmin from "@/api/middlewares/checkIsAdmin";
import slowDown from "@/api/middlewares/slowDown";
import validate from "@/api/middlewares/validate";
import mw from "@/api/mw";
import { arrayOrStringValidator, arrayValidator, boolValidator, limitValidator, numberValidator, orderFieldValidator, orderValidator, pageValidator, searchValidator, stringValidator } from "@/validator";
import getProductsAverageRating from "@/web/services/products/getProductsAverageRating";
import getProductsImagesWithSignedUrls from "@/web/services/products/getProductsImagesWithSignedUrl";


const handler = mw({
  GET: [
    slowDown(500),
    validate({
      query: {
        priceMin: numberValidator,
        priceMax: numberValidator,
        materials: arrayOrStringValidator,
        onlyInStock: boolValidator,
        categories: arrayOrStringValidator,
        limit: limitValidator.default(10),
        page: pageValidator,
        orderField: orderFieldValidator(["id", "name", "price", "stock"]).default("id"),
        order: orderValidator.default("asc"),
        search: searchValidator,
        showInHome: boolValidator
      }
    }),
    async ({
      locals: {
        query: { priceMin, priceMax, materials, onlyInStock, categories, limit, page, orderField, order, search, showInHome}
      },
      res
    }) => {      
      try {
        const materialsArray = Array.isArray(materials) ? materials : [materials];
        const categoriesArray = Array.isArray(categories) ? categories : [categories];

        const searchValue = search.toLowerCase(); 
        const query = ProductModel.query(); 

        if (orderField) {
          query.orderBy(orderField, order); 
        }

        if (search) {
          query
            .whereRaw("LOWER(\"name\") LIKE ?", `%${searchValue}%`);
        }

        if (priceMin) {
          query.where("price", ">", priceMin);
        }

        if (priceMax) {
          query.where("price", "<", priceMax);
        }

        if (categories) {
          query.whereIn("categoryId", categoriesArray);
        } 

        if (materials) {
          const materialsProducts = await ProductMaterialRelationModel.query()
            .select("productId")
            .whereIn("materialId", materialsArray);
          
          const productIds = materialsProducts.reduce((acc, { productId }) => [...acc, productId], []);

          query.whereIn("id", productIds);
        }

        if (onlyInStock === true) {
          query.where("stock", ">", 0);
        }

        if (showInHome === true) {
          query.where("showInHome", true);
        }

        const countQuery = query.clone();
        const [{ count }] = await countQuery.clearSelect().clearOrder().count();

        const products = await query.modify("paginate", limit, page)
          .select("id", "name", "description", "price", "stock", "showInHome")
          .withGraphFetched("category")
          .withGraphFetched("materials")
          .withGraphFetched("reviews")
          .withGraphFetched("productImages");
        
        // Products with average rating
        const productsWithAverageRating = getProductsAverageRating(products); 
        
        // Add signed url to all products images
        const productsWithSignedUrlImages = await getProductsImagesWithSignedUrls(productsWithAverageRating);

        res.status(200).send({ products: productsWithSignedUrlImages, count: count });
      } catch (error) {
        res.status(500).send({ error: error });
      }
    }
  ], 
  POST: [
    slowDown(500),
    auth(),
    checkIsAdmin(),
    validate({
      body: { 
        name: stringValidator.required(),
        description: stringValidator.required(),
        price: numberValidator.required(),
        stock: numberValidator.required(),
        categoryId: numberValidator.required(),
        materials: arrayValidator.required()
      }
    }),
    async({
      locals: {
        body: { name, description, price, stock, categoryId, materials }
      }, 
      res
    }) => {
      try {
        const category = await CategoryModel.query().findOne({ id: categoryId });

        if (!category) {
          res.status(404).send({ error: "Category not found" });

          return;
        }

        const newProduct = await ProductModel.query()
          .insert({
            name: name,
            description: description,
            price: price,
            stock: stock,
            categoryId: categoryId
          })
          .returning("*");
        
        const materialsToAdd = materials.reduce((acc, materialId) =>
          [...acc, { productId: newProduct.id, materialId: materialId }], []);
        
        if (materialsToAdd.length > 0) {
          await ProductMaterialRelationModel.query()
            .insert(materialsToAdd)
            .returning("*"); 
        }
        
        res.status(201).send({ product: newProduct, message: "Product successfully added" });
      } catch (error) {
        res.status(500).send({ error: error }); 
      }
    }
  ]
});

export default handler;