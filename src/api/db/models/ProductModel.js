import BaseModel from "@/api/db/models/BaseModel.js"
import CategoryModel from "@/api/db/models/CategoryModel.js"
import MaterialModel from "./MaterialModel"
import ReviewModel from "./ReviewModel"

class ProductModel extends BaseModel {
  static tableName = "products"

  static modifiers = {
    paginate: (query, limit, page) =>
      query.limit(limit).offset((page - 1) * limit),
  }

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
            to: "products_materials_relation.materialId",
          },
          to: "materials.id",
        },
      },
      reviews: {
        relation: BaseModel.HasManyRelation,
        modelClass: ReviewModel,
        join: {
          from: "products.id",
          to: "reviews.productId",
        },
        modify: (query) => query.select("userId", "title", "content", "rating"),
      },
      modify: (query) => query.select("*"),
    }
  }
}

export default ProductModel
