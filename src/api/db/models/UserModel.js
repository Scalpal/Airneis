import hashPassword from "@/api/db/hashPassword.js";
import BaseModel from "@/api/db/models/BaseModel.js";
import AddressModel from "@/api/db/models/AddressModel.js";
import OrderModel from "@/api/db/models/OrderModel.js";

class UserModel extends BaseModel {
  static tableName = "users";

  static modifiers = {
    paginate: (query, limit, page) =>
      query.limit(limit).offset((page - 1) * limit),
  };

  static relationMappings() {
    return {
      address: {
        relation: BaseModel.HasManyRelation,
        modelClass: AddressModel,
        join: {
          from: "users.id",
          to: "addresses.userId",
        },
      },
      orders: {
        relation: BaseModel.HasManyRelation,
        modelClass: OrderModel,
        join: {
          from: "users.id",
          to: "orders.userId",
        },
        modify: (query) =>
          query.select(
            "id",
            "email",
            "firstName",
            "lastName",
            "phoneNumber",
            "active",
            "isAdmin"
          ),
      },
    };
  }

  checkPassword = async (password) => {
    const [passwordHash] = await hashPassword(password, this.passwordSalt);

    return passwordHash === this.passwordHash;
  };
}

export default UserModel;
