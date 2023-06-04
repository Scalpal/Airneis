import BaseModel from "@/api/db/models/BaseModel.js"

class ProductModel extends BaseModel {
  static tableName = "products_images";
}

export default ProductModel
