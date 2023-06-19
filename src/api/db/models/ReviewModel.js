import BaseModel from "@/api/db/models/BaseModel.js";
import UserModel from "./UserModel";

class ReviewModel extends BaseModel {
  static tableName = "reviews";

  static modifiers = {
    paginate: (query, limit, page) =>
      query.limit(limit).offset((page - 1) * limit),
  };

  static relationMappings() {
    return {
      user: {
        relation: BaseModel.HasOneRelation,
        modelClass: UserModel,
        join: {
          from: "reviews.userId",
          to: "users.id"
        }
      },
      modify: (query) => query.select("firstName", "lastName")
    };
  }
}

export default ReviewModel;
