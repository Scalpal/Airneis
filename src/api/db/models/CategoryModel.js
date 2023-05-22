import BaseModel from "@/api/db/models/BaseModel.js"
import UserModel from "./UserModel"

class CategoryModel extends BaseModel {
  static tableName = "categories";

  static relationMappings() {
    return {
      user: {
        relation: BaseModel.HasOneRelation,
        modelClass: UserModel,
        join: {
          from: "address.userId",
          to: "users.id",
        },
      },
    }
  }
}

export default CategoryModel
