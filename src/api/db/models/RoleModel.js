import BaseModel from "@/api/db/models/BaseModel.js";
import UserModel from "@/api/db/models/UserModel.js";

class RoleModel extends BaseModel {
  static tableName = "user_role"
}

export default RoleModel;
