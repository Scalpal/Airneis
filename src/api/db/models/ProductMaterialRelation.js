import BaseModel from "@/api/db/models/BaseModel.js"
import ProductModel from "@/api/db/models/ProductModel"
import MaterialModel from "@/api/db/models/MaterialModel"

class ProductMaterialModel extends BaseModel {
  static tableName = "products_materials_relation";

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
    }
  }
}

export default ProductMaterialModel
