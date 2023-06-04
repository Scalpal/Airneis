import BaseModel from "@/api/db/models/BaseModel.js"
import ProductModel from "./ProductModel"

class MaterialModel extends BaseModel {
  static tableName = "materials"

  static modifiers = {
    paginate: (query, limit, page) =>
      query.limit(limit).offset((page - 1) * limit),
  }

  static relationMappings() {
    return {
      product: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: ProductModel,
        join: {
          from: "materials.id",
          through: {
            from: "products_materials_relation.materialId",
            to: "products_materials_relation.productId",
          },
          to: "products.id",
        },
      },
    }
  }
}

export default MaterialModel
