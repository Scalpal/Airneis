import { faker } from "@faker-js/faker";

const createSlug = (string) => string.split(" ").join("-").toLowerCase();

export const seed = async (knex) => {
  const genericCategories = [
    "Seating",
    "Tables",
    "Storage",
    "Beds",
    "Outdoor",
    "Entertainment",
    "Office",
    "Dining",
    "Kids",
    "Lighting"
  ];

  const loop = genericCategories.length;

  const categories = [];

  for (let i = 0; i < loop; i++) {
    const categoryName = faker.commerce.product();
    categories.push({ name: categoryName, slug: createSlug(categoryName), description: faker.commerce.productDescription() });
  }

  let uniqueCategories = categories.filter(
    (category, i, self) =>
      i === self.findIndex((index) => index.name === category.name)
  );

  const existingCategories = await knex("categories").select("name");

  const existingCategoriesNames = existingCategories.map(
    (category) => category.name
  );

  uniqueCategories = uniqueCategories.filter(
    (category) => !existingCategoriesNames.includes(category.name)
  );

  if (uniqueCategories.length !== 0) {
    await knex("categories").insert(uniqueCategories);
  }
};
