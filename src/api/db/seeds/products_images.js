module.exports.seed = async (knex) => {
  await knex("products_images").del();
  await knex("products_images").insert([
    {
      productId: 1,
      imageSrc: "/meuble-2.jpeg",
    },
  ]);
};
