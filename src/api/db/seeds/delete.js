export const seed = async (knex) => {
  await knex("reviews").del()
  await knex("products_images").del()
  await knex("products_materials_relation").del()
  await knex("products").del()
  await knex("categories").del()
  await knex("materials").del()
  await knex("orders").del()
  await knex("addresses").del()
  await knex("users").del()
}
