import { faker } from "@faker-js/faker"

export const seed = async (knex) => {
  const loop = 100

  const categories = []
  for (let i = 0; i < loop; i++) {
    categories.push({ name: faker.commerce.product() })
  }
  let uniqueCategories = categories.filter(
    (category, i, self) =>
      i === self.findIndex((index) => index.name === category.name)
  )
  const existingCategories = await knex("categories").select("name")
  const existingCategoriesNames = existingCategories.map(
    (category) => category.name
  )
  uniqueCategories = uniqueCategories.filter(
    (category) => !existingCategoriesNames.includes(category.name)
  );

  if (uniqueCategories.length !== 0) {
    await knex("categories").insert(uniqueCategories)
  }
}
