import BaseModel from "@/api/db/models/BaseModel.js";

class MaterialModel extends BaseModel {
  static tableName = "materials";

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

export default MaterialModel;
