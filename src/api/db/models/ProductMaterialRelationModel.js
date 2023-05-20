import BaseModel from "@/api/db/models/BaseModel.js";
import ProductModel from "@/api/db/models/ProductModel";
import MaterialModel from "@/api/db/models/MaterialModel";

<<<<<<< Updated upstream:src/api/db/models/ProductMaterialRelation.js
class ProductMaterialModel extends BaseModel {
  static tableName = "products_materials_relation";
=======
class ProductMaterialRelationModel extends BaseModel {
  static tableName = "products_materials_relation"
>>>>>>> Stashed changes:src/api/db/models/ProductMaterialRelationModel.js

  static relationMappings() {
    return {
      product: {
        relation: BaseModel.HasOneRelation,
        modelClass: ProductModel,
        join: {
          from: "products_materials_relation.productId",
          to: "products.id",
        },
      },
      material: {
        relation: BaseModel.HasOneRelation,
        modelClass: MaterialModel,
        join: {
          from: "products_materials_relation.materialId",
          to: "materials.id",
        },
      },
    };
  }
}

export default ProductMaterialRelationModel;
