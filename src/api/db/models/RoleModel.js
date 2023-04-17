import BaseModel from "@/api/db/models/BaseModel.js";

class RoleModel extends BaseModel {
  static tableName = "userRoles";
}

export default RoleModel;
