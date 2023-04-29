import BaseModel from "@/api/db/models/BaseModel.js";
import RoleModel from "@/api/db/models/RoleModel.js";

class AddressModel extends BaseModel {
  static tableName = "address"

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

export default AddressModel;
