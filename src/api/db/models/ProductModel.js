import BaseModel from "@/api/db/models/BaseModel.js"
import CategoryModel from "@/api/db/models/CategoryModel.js"
import ProductMaterialRelation from "@/api/db/models/ProductMaterialRelation.js"
import MaterialModel from "@/api/db/models/MaterialModel.js"
import ImageModel from "@/api/db/models/ImageModel.js"

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
      images: {
        relation: BaseModel.HasManyRelation,
        modelClass: ImageModel,
        filter: (query) => query.select("id", "imageSrc"),
        join: {
          from: "products.id",
          to: "products_images.productId",
        },
      },
      materials: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: MaterialModel,
        join: {
          from: "products.id",
          through: {
            modelClass: ProductMaterialRelation,
            from: "products_materials_relation.productId",
            to: "products_materials_relation.materialId",
          },
          to: "materials.id",
        },
      },
    }
  }
}

export default ProductModel
