import BaseModel from "@/api/db/models/BaseModel.js";
import CategoryModel from "@/api/db/models/CategoryModel.js";

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
    };
  }
}

export default ProductModel;
