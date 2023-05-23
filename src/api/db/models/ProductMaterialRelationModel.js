import BaseModel from "@/api/db/models/BaseModel.js";
import MaterialModel from "@/api/db/models/MaterialModel";

class ProductMaterialRelationModel extends BaseModel {
  static tableName = "products_materials_relation";

  static relationMappings() {
    return {
      material: {
        relation: BaseModel.HasOneRelation,
        modelClass: MaterialModel,
        join: {
          from: "products_materials_relation.materialId",
          to: "materials.id",
        },
      },
    };
  }
}

export default ProductMaterialRelationModel;
