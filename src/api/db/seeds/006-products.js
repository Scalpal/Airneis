import { faker } from "@faker-js/faker";

export const seed = async (knex) => {
  const loop = 100;

  const categoryIds = await knex("categories").pluck("id");
  const products = [];
  for (let i = 0; i < loop; i++) {
    const randomCategoryId = faker.helpers.arrayElement(categoryIds);
    products.push({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price({ min: 10, max: 1000, dec: 0 }),
      stock: faker.number.int(100),
      categoryId: randomCategoryId,
    });
  }
  let productIds = [];
  await knex("products")
    .insert(products)
    .returning("id")
    .then((ids) => (productIds = ids));
  productIds = productIds.map((product) => product.id);

  const productsImages = [];
  for (let i = 0; i < loop; i++) {
    productsImages.push({
      imageSrc: "/meuble-2.jpeg",
      productId: productIds[i],
    });
  }
  await knex("products_images").insert(productsImages);

  const materialIds = await knex("materials").pluck("id");
  const productsMaterialsRelation = [];
  for (let i = 0; i < loop; i++) {
    const randomMaterialId = faker.helpers.arrayElement(materialIds);
    productsMaterialsRelation.push({
      productId: productIds[i],
      materialId: randomMaterialId,
    });
  }
  await knex("products_materials_relation").insert(productsMaterialsRelation);
};
