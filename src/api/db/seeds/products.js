module.exports.seed = async (knex) => {
  await knex("products").del();
  await knex("products").insert([
    {
      name: "Modern beechwood chair",
      description: "Black chairs made of 100 year old Himalayan beech wood",
      price: 145,
      stock: 25,
      categoryId: 1,
    },
    {
      name: "Chair",
      description: "",
      price: 145,
      stock: 1,
      categoryId: 3,
    },
    {
      name: "Table",
      description: "",
      price: 105,
      stock: 1,
      categoryId: 2,
    },
    {
      name: "Curtain",
      description: "",
      price: 45,
      stock: 1,
      categoryId: 13,
    },
    {
      name: "Samsung TV OLED 4K",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consectetur ipsum eu fermentum pulvinar. Donec vitae egestas elit. Pellentesque et elementum nunc. Fusce a ligula nunc. Nunc interdum enim odio, id placerat ex convallis nec. Nam tempus sagittis libero, a cursus ipsum ullamcorper non. Duis quam lectus, volutpat non nisi.",
      price: 2499,
      stock: 1,
      categoryId: 13,
    },
  ]);
};
