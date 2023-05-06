module.exports.seed = async (knex) => {
  await knex("products_materials_relation").del();
  await knex("products_materials_relation").insert([
    {
      productId: 1,
      materialId: 1,
    },
    {
      productId: 2,
      materialId: 1,
    },
    {
      productId: 3,
      materialId: 1,
    },
    {
      productId: 4,
      materialId: 6,
    },
    {
      productId: 5,
      materialId: 3,
    },
  ]);
};
