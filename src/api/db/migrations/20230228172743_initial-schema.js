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
    table
      .enu("role", ["admin", "utilisateur"])
      .notNullable()
      .defaultTo("utilisateur");
    table.timestamps(true, true, true);
  });

  await knex.schema
    .createTable("categories", (table) => {
      table.increments("id");
      table.text("name").notNullable();
      table.timestamps(true, true, true);
    })
    .then(
      knex("categories").insert([
        { name: "bois" },
        { name: "chêne" },
        { name: "laine" },
      ])
    );

  await knex.schema
    .createTable("materials", (table) => {
      table.increments("id");
      table.text("name").notNullable();
      table.timestamps(true, true, true);
    })
    .then(
      knex("materials").insert([
        { name: "métal" },
        { name: "acier" },
        { name: "fer" },
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
    .then(
      knex("products").insert([
        {
          title: "chaise",
          materialId: 1,
          description: "",
          price: 145,
          quantity: 1,
          categoryId: 1,
        },
        {
          title: "table",
          materialId: 1,
          description: "",
          price: 105,
          quantity: 1,
          categoryId: 2,
        },
        {
          title: "rideau",
          materialId: 1,
          description: "",
          price: 45,
          quantity: 1,
          categoryId: 3,
        },
        {
          title: "chaise",
          materialId: 1,
          description: "",
          price: 145,
          quantity: 25,
          categoryId: 1,
        },
        {
          title: "chaise",
          materialId: 1,
          description: "Chaises noir en bois de hêtre centenaire d'Himalaya",
          price: 145,
          quantity: 25,
          categoryId: 1,
        },
        {
          title: "Samsung TV OLED 4K",
          materialId: 1,
          description:
            "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié.",
          price: 2499,
          quantity: 1,
          categoryId: 1,
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

  await knex.schema.createTable("productImages", (table) => {
    table.increments("id");
    table
      .integer("productId")
      .references("id")
      .inTable("products")
      .notNullable();
    table.binary("image").notNullable();
    table.timestamps(true, true, true);
  });

  await knex.schema.createTable("commands", (table) => {
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
  await knex.schema.dropTable("userRoles");
  await knex.schema.dropTable("commands");
  await knex.schema.dropTable("productImages");
  await knex.schema.dropTable("reviews");
  await knex.schema.dropTable("products");
  await knex.schema.dropTable("materials");
  await knex.schema.dropTable("categories");
  await knex.schema.dropTable("users");
};
