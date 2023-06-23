import BaseModel from "@/api/db/models/BaseModel.js"

class OrderProductRelationModel extends BaseModel {
  static tableName = "products"

  // static relationMappings() {
  //   return {
  //     category: {
  //       relation: BaseModel.HasOneRelation,
  //       modelClass: CategoryModel,
  //       join: {
  //         from: "products.categoryId",
  //         to: "category.id",
  //       },
  //     },
  //   };
  // }
}

export default OrderProductRelationModel
