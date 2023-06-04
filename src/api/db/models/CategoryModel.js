import BaseModel from "@/api/db/models/BaseModel.js"
import UserModel from "./UserModel"

class CategoryModel extends BaseModel {
  static tableName = "categories"

  static modifiers = {
    paginate: (query, limit, page) =>
      query.limit(limit).offset((page - 1) * limit),
  }

  static relationMappings() {
    return {
      user: {
        relation: BaseModel.HasOneRelation,
        modelClass: UserModel,
        join: {
          from: "addresses.userId",
          to: "users.id",
        },
      },
    }
  }
}

export default CategoryModel
