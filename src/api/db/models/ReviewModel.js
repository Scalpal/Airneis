import BaseModel from "@/api/db/models/BaseModel.js";

class ReviewModel extends BaseModel {
  static tableName = "reviews";

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

export default ReviewModel;
