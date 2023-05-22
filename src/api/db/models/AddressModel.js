import BaseModel from "@/api/db/models/BaseModel.js"
import UserModel from "./UserModel"

class AddressModel extends BaseModel {
  static tableName = "addresses";

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

export default AddressModel
