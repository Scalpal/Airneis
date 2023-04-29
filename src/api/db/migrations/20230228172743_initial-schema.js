module.exports.up = async (knex) => {
  // Related to users
  await knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.text("email").notNullable().unique();
    table.text("passwordHash").notNullable();
    table.text("passwordSalt").notNullable();
    table.text("firstName").notNullable();
    table.text("lastName").notNullable();
    table.text("phoneNumber").notNullable();
    table.boolean("active").notNullable().defaultTo(true);
    table.boolean("isAdmin").notNullable().defaultTo(false);
    table.timestamps(true, true, true);
  });

  await knex.schema.createTable("address", (table) => {
    table.increments("id");
    table.text("address");
    table.text("city");
    table.text("region");
    table.text("postalCode");
    table.text("country");
    table.bool("mainAdress").notNullable().defaultTo(false); 
    table.integer("userId").notNullable().references("id").inTable("users");
  });

  // Related to products
  await knex.schema.createTable("categories", (table) => {
    table.increments("id");
    table.text("name").notNullable();
  });

  await knex.schema.createTable("materials", (table) => {
    table.increments("id");
    table.text("name").notNullable();
  });

  await knex.schema.createTable("products", (table) => {
    table.increments("id");
    table.text("name").notNullable();
    table.text("description").notNullable();
    table.integer("price").notNullable();
    table.integer("stock").notNullable().defaultTo(1);
    table.integer("categoryId").notNullable().references("id").inTable("categories"); 
    table.timestamps(true, true, true);
  });

  // await knex.schema.createTable("productImage", (table) => {
  //   table.increments("id");
  //   table.integer("productId").references("id").inTable("product").notNullable();
  //   table.binary("image").notNullable();
  //   table.timestamps(true, true, true);
  // });

  await knex.schema.createTable("products_materials_relation", (table) => {
    table.integer("productId").notNullable().references("id").inTable("products");
    table.integer("materialId").notNullable().references("id").inTable("materials");
    table.primary(["productId", "materialId"]); 
  });

  // Related to reviews
  await knex.schema.createTable("review", (table) => {
    table.increments("id");
    table.integer("productId").references("id").inTable("products").notNullable();
    table.integer("userId").references("id").inTable("users").notNullable();
    table.text("title").notNullable();
    table.text("content").notNullable();
    table.enum("stars", [1, 2, 3, 4, 5]).notNullable().defaultTo(1); 
    table.timestamps(true, true, true);
  });

  // Related to orders
  await knex.schema.createTable("orders", (table) => {
    table.increments("id");
    table.integer("userId").notNullable().references("id").inTable("users");
    table.integer("deliveryAdress").notNullable().references("id").inTable("address"); 
    table.enum("status", ["cancelled", "on standby", "delivered"]).notNullable();
    table.timestamps(true, true, true);
  });

  await knex.schema.createTable("orders_products_relation", (table) => {
    table.integer("orderId").notNullable().references("id").inTable("orders");
    table.integer("productId").notNullable().references("id").inTable("products");
    table.integer("quantity").notNullable().defaultTo(1); 
    table.primary(["orderId", "productId"]);
  });

  await knex.schema.createTable("image_home_carousel", (table) => {
    table.increments("id");
    table.text("src").notNullable().unique();
    table.boolean("visible").notNullable().defaultTo(true);
    table.integer("rank").unique();
  });
};


module.exports.down = async (knex) => {
  await knex.schema.dropTable("image_home_carousel");
  await knex.schema.dropTable("orders_products_relation");
  await knex.schema.dropTable("orders");
  await knex.schema.dropTable("review");
  await knex.schema.dropTable("products_materials_relation");
  // await knex.schema.dropTable("product_image");
  await knex.schema.dropTable("products");
  await knex.schema.dropTable("materials");
  await knex.schema.dropTable("categories");
  await knex.schema.dropTable("address");
  await knex.schema.dropTable("users");
};
