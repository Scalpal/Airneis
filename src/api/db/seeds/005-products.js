import { faker } from "@faker-js/faker";
import data from "./genericProducts.json";

const createSlug = (string) => string.split(" ").join("-").toLowerCase();

export const seed = async (knex) => {
  const genericProducts = data;

  const loop = genericProducts.length;

  const products = [];
  for (let i = 0; i < loop; i++) {
    const product = genericProducts[i];

    const [category] = await knex("categories")
      .where({ name: product.category })
      .returning("id");
        
    products.push({
      name: product.name,
      description: product.description,
      slug: createSlug(product.name),
      price: faker.commerce.price({
        min: 10,
        max: 1000,
        dec: 0
      }),
      stock: faker.number.int(100),
      categoryId: category.id
    });
  }

  const productIds = await knex("products")
    .insert(products)
    .returning("id");

  // Add product images
  // const productsImages = [];
  // for (let i = 0; i < loop; i++) {
  //   const productId = productIds[i].id; 
  //   productsImages.push({
  //     imageSrc: "/meuble-2.jpeg",
  //     productId
  //   });
  // }
  // await knex("products_images").insert(productsImages);

  // Add relation between products and their materials
  const productsMaterialsRelation = [];
  for (let i = 0; i < loop; i++) {
    const productId = productIds[i].id; 
    const materialsList = genericProducts[i].materials;

    // Find materials by name
    const materialIds = await knex("materials")
      .whereIn("name", materialsList.split(", "))
      .returning("id");
    
    // Add relation between material and product
    for (let j = 0; j < materialIds.length; j++) {
      const materialId = materialIds[j].id;
      productsMaterialsRelation.push({
        productId,
        materialId
      });
    }
  }
  await knex("products_materials_relation").insert(productsMaterialsRelation);
};
