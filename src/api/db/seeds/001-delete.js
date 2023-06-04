export const seed = async (knex) => {
  await knex("image_home_carousel").del()
  await knex("orders_products_relation").del()
  await knex("orders").del()
  await knex("reviews").del()
  await knex("products_materials_relation").del()
  await knex("products_images").del()
  await knex("products").del()
  await knex("materials").del()
  await knex("categories").del()
  await knex("addresses").del()
  await knex("users").del()
}
