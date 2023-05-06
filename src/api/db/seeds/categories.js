module.exports.seed = async (knex) => {
  await knex("categories").del();
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
};
