import { faker } from "@faker-js/faker";

export const seed = async (knex) => {
  const loop = 100;

  const categories = [];
  for (let i = 0; i < loop; i++) {
    categories.push({ name: faker.commerce.product() });
  }
  const uniqueCategories = categories.filter(
    (category, i, self) => i === self.findIndex((o) => o.name === category.name)
  );
  await knex("categories").insert(uniqueCategories);

  const materials = [];
  for (let i = 0; i < loop; i++) {
    materials.push({ name: faker.commerce.productMaterial() });
  }
  const uniqueMaterials = categories.filter(
    (material, i, self) => i === self.findIndex((o) => o.name === material.name)
  );
  await knex("materials").insert(uniqueMaterials);

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
  await knex("products").insert(products);

  const productIds = await knex("products").pluck("id");
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
