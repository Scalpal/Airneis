import BaseModel from "@/api/db/models/BaseModel.js";

class OrderModel extends BaseModel {
  static tableName = "orders"

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

export default OrderModel;
