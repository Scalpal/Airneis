import BaseModel from "@/api/db/models/BaseModel.js";
import CategoryModel from "@/api/db/models/CategoryModel.js";
import MaterialModel from "./MaterialModel";

class ProductModel extends BaseModel {
  static tableName = "products";

  static relationMappings() {
    return {
      category: {
        relation: BaseModel.HasOneRelation,
        modelClass: CategoryModel,
        join: {
          from: "products.categoryId",
          to: "categories.id",
        },
      },
      materials: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: MaterialModel,
        join: {
          from: "products.id",
          through: {
            from: "products_materials_relation.productId",
            to: "products_materials_relation.materialId"
          },
          to: "materials.id"
        }
      }
    };
  }
}

export default ProductModel;
