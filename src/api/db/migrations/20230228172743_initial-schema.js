export const up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.text("email").notNullable().unique();
    table.text("passwordHash").notNullable();
    table.text("passwordSalt").notNullable();
    table.string("firstName").notNullable();
    table.string("lastName").notNullable();
    table.string("phoneNumber").notNullable();
    table.text("address");
    table.boolean("activate").notNullable().defaultTo(false);
    table.string("postcode");
    table.string("city");
    table.string("region");
    table.string("contry");
    table.timestamps(true, true, true);
  });
  await knex.schema.createTable("user_role", (table) => {
    table.increments("id");
    table.integer("usersId").references("id").inTable("users").notNullable();
    table
      .enu("role", ["admin", "utilisateurs"])
      .notNullable()
      .defaultTo("utilisateurs");
    table.timestamps(true, true, true);
  });
  await knex.schema.createTable("category", (table) => {
    table.increments("id");
    table.text("name").notNullable();
    table.timestamps(true, true, true);
  });
  await knex.schema.createTable("materials", (table) => {
    table.increments("id");
    table.text("name").notNullable();
    table.timestamps(true, true, true);
  });
  await knex.schema.createTable("product", (table) => {
    table.increments("id");
    table.string("title").notNullable();
    table.text("description").notNullable();
    table.integer("price").notNullable();
    table
      .integer("materialsId")
      .references("id")
      .inTable("materials")
      .notNullable();
    table.integer("quantity").notNullable().defaultTo(1);
    table
      .integer("categoryId")
      .references("id")
      .inTable("category")
      .notNullable();
    table.timestamps(true, true, true);
  });
  await knex.schema.createTable("review", (table) => {
    table.increments("id");
    table
      .integer("productId")
      .references("id")
      .inTable("product")
      .notNullable();
    table.integer("usersId").references("id").inTable("users").notNullable();
    table.string("title").notNullable();
    table.text("comment").notNullable();
    table.double("rate", 2, 1);
    table.timestamps(true, true, true);
  });
  await knex.schema.createTable("productImage", (table) => {
    table.increments("id");
    table
      .integer("productId")
      .references("id")
      .inTable("product")
      .notNullable();
    table.binary("image").notNullable();
    table.timestamps(true, true, true);
  });
  await knex.schema.createTable("command", (table) => {
    table.increments("id");
    table.integer("usersId").references("id").inTable("users").notNullable();
    table
      .integer("productId")
      .references("id")
      .inTable("product")
      .notNullable();
    table.integer("quantity").notNullable().defaultTo(1);
    table
      .enu("status", [
        "en cours de validation",
        "préparation de la commande",
        "en cours de livraison",
        "livré",
      ])
      .notNullable();
    table.timestamps(true, true, true);
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable("user_role");
  await knex.schema.dropTable("command");
  await knex.schema.dropTable("productImage");
  await knex.schema.dropTable("review");
  await knex.schema.dropTable("product");
  await knex.schema.dropTable("category");
  await knex.schema.dropTable("users");
};
