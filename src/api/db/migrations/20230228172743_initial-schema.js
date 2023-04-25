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
    table.string("country");
    table.timestamps(true, true, true);
  });

  await knex.schema.createTable("userRoles", (table) => {
    table.increments("id");
    table.integer("userId").references("id").inTable("users").notNullable();
    table.enu("role", ["admin", "user"]).notNullable().defaultTo("user");
    table.timestamps(true, true, true);
  });

  await knex.schema
    .createTable("categories", (table) => {
      table.increments("id");
      table.text("name").notNullable();
      table.timestamps(true, true, true);
    })
    .then(() =>
      knex("categories").insert([
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
      ])
    );

  await knex.schema
    .createTable("materials", (table) => {
      table.increments("id");
      table.text("name").notNullable();
      table.timestamps(true, true, true);
    })
    .then(() =>
      knex("materials").insert([
        { name: "Wood" },
        { name: "Steel" },
        { name: "Plastic" },
        { name: "Glass" },
        { name: "Copper" },
        { name: "Wool" },
        { name: "Iron" },
        { name: "Metal" },
        { name: "Oak" },
      ])
    );

  await knex.schema
    .createTable("products", (table) => {
      table.increments("id");
      table.string("title").notNullable();
      table.text("description").notNullable();
      table.integer("price").notNullable();
      table
        .integer("materialId")
        .references("id")
        .inTable("materials")
        .notNullable();
      table.integer("quantity").notNullable().defaultTo(1);
      table
        .integer("categoryId")
        .references("id")
        .inTable("categories")
        .notNullable();
      table.timestamps(true, true, true);
    })
    .then(() =>
      knex("products").insert([
        {
          title: "Modern beechwood chair",
          materialId: 1,
          description: "Black chairs made of 100 year old Himalayan beech wood",
          price: 145,
          quantity: 25,
          categoryId: 1,
        },
        {
          title: "Chair",
          materialId: 1,
          description: "",
          price: 145,
          quantity: 1,
          categoryId: 3,
        },
        {
          title: "Table",
          materialId: 1,
          description: "",
          price: 105,
          quantity: 1,
          categoryId: 2,
        },
        {
          title: "Curtain",
          materialId: 6,
          description: "",
          price: 45,
          quantity: 1,
          categoryId: 13,
        },
        {
          title: "Samsung TV OLED 4K",
          materialId: 3,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consectetur ipsum eu fermentum pulvinar. Donec vitae egestas elit. Pellentesque et elementum nunc. Fusce a ligula nunc. Nunc interdum enim odio, id placerat ex convallis nec. Nam tempus sagittis libero, a cursus ipsum ullamcorper non. Duis quam lectus, volutpat non nisi.",
          price: 2499,
          quantity: 1,
          categoryId: 13,
        },
      ])
    );

  await knex.schema.createTable("reviews", (table) => {
    table.increments("id");
    table
      .integer("productId")
      .references("id")
      .inTable("products")
      .notNullable();
    table.integer("userId").references("id").inTable("users").notNullable();
    table.string("title").notNullable();
    table.text("comment").notNullable();
    table.double("rate", 2, 1);
    table.timestamps(true, true, true);
  });

  await knex.schema
    .createTable("productImages", (table) => {
      table.increments("id");
      table
        .integer("productId")
        .references("id")
        .inTable("products")
        .notNullable();
      table.binary("image").notNullable();
      table.timestamps(true, true, true);
    })
    .then(() =>
      knex("productImages").insert({
        productId: 1,
        image: "/meuble-2.jpeg",
      })
    );

  await knex.schema.createTable("orders", (table) => {
    table.increments("id");
    table.integer("userId").references("id").inTable("users").notNullable();
    table
      .integer("productId")
      .references("id")
      .inTable("products")
      .notNullable();
    table.integer("quantity").notNullable().defaultTo(1);
    table
      .enu("status", [
        "pending validation",
        "pending order",
        "pending delivery",
        "shipped",
      ])
      .notNullable();
    table.timestamps(true, true, true);
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable("userRoles");
  await knex.schema.dropTable("orders");
  await knex.schema.dropTable("productImages");
  await knex.schema.dropTable("reviews");
  await knex.schema.dropTable("products");
  await knex.schema.dropTable("materials");
  await knex.schema.dropTable("categories");
  await knex.schema.dropTable("users");
};
