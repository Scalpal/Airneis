import BaseModel from "@/api/db/models/BaseModel.js";

class ReviewModel extends BaseModel {
  static tableName = "reviews";

  static modifiers = {
    paginate: (query, limit, page) =>
      query.limit(limit).offset((page - 1) * limit),
  };

  static relationMappings() {
    return {
      modify: (query) => query.select("*")
    };
  }
}

export default ReviewModel;
