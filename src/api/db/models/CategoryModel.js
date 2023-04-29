import BaseModel from "@/api/db/models/BaseModel.js";
import RoleModel from "@/api/db/models/RoleModel.js";

class CategoryModel extends BaseModel {
  static tableName = "categories"

  static relationMappings() {
    return {
      user: {
        relation: BaseModel.HasOneRelation,
        modelClass: RoleModel,
        join: {
          from: "address.userId",
          to: "users.id",
        },
      },
    };
  }
}

export default CategoryModel;
