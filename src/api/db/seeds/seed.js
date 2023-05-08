module.exports.seed = async (knex) => {
  await knex("products_images").del();
  await knex("products_materials_relation").del();
  await knex("products").del();
  await knex("categories").del();
  await knex("materials").del();

  await knex("categories").insert([
    { name: "Bed" },
    { name: "Table" },
    { name: "Chair" },
    { name: "Modern" },
    { name: "Vintage" },
    { name: "Contemporary" },
    { name: "Artisanal" },
    { name: "Wood" },
    { name: "Bedding" },
    { name: "Swedish special" },
    { name: "Marble" },
    { name: "Living room" },
    { name: "Shower" },
  ]);

  const [chair, table, livingRoom, shower] = await knex("categories")
    .select("id")
    .where((builder) =>
      builder.whereIn("name", ["Chair", "Table", "Living room", "Shower"])
    );

  await knex("materials").insert([
    { name: "Wood" },
    { name: "Steel" },
    { name: "Plastic" },
    { name: "Glass" },
    { name: "Copper" },
    { name: "Wool" },
    { name: "Iron" },
    { name: "Metal" },
    { name: "Oak" },
  ]);

  const [wood, plastic, wool] = await knex("materials")
    .select("id")
    .where((builder) => builder.whereIn("name", ["Wood", "Plastic", "Wool"]));

  await knex("products").insert([
    {
      name: "Modern beechwood chair",
      description: "Black chairs made of 100 year old Himalayan beech wood",
      price: 145,
      stock: 25,
      categoryId: chair.id,
    },
    {
      name: "Chair",
      description: "",
      price: 145,
      stock: 1,
      categoryId: chair.id,
    },
    {
      name: "Table",
      description: "",
      price: 105,
      stock: 1,
      categoryId: table.id,
    },
    {
      name: "Curtain",
      description: "",
      price: 45,
      stock: 1,
      categoryId: shower.id,
    },
    {
      name: "Samsung TV OLED 4K",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consectetur ipsum eu fermentum pulvinar. Donec vitae egestas elit. Pellentesque et elementum nunc. Fusce a ligula nunc. Nunc interdum enim odio, id placerat ex convallis nec. Nam tempus sagittis libero, a cursus ipsum ullamcorper non. Duis quam lectus, volutpat non nisi.",
      price: 2499,
      stock: 1,
      categoryId: livingRoom.id,
    },
  ]);

  const [modernChair, productChair, productTable, curtain, tv] = await knex(
    "products"
  ).select("id");

  await knex("products_images").insert([
    {
      productId: modernChair.id,
      imageSrc: "/meuble-2.jpeg",
    },
  ]);

  await knex("products_materials_relation").insert([
    {
      productId: modernChair.id,
      materialId: wood.id,
    },
    {
      productId: productChair.id,
      materialId: wood.id,
    },
    {
      productId: productTable.id,
      materialId: wood.id,
    },
    {
      productId: curtain.id,
      materialId: wool.id,
    },
    {
      productId: tv.id,
      materialId: plastic.id,
    },
  ]);
};
