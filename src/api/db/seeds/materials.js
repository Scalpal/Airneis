module.exports.seed = async (knex) => {
  await knex("materials").del();
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
};
