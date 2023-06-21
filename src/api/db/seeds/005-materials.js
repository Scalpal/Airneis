import { faker } from "@faker-js/faker"

export const seed = async (knex) => {
  const loop = 100

  const materials = []
  for (let i = 0; i < loop; i++) {
    materials.push({ name: faker.commerce.productMaterial() })
  }
  let uniqueMaterials = materials.filter(
    (material, i, self) =>
      i === self.findIndex((index) => index.name === material.name)
  )
  const existingMaterials = await knex("materials").select("name")
  const existingMaterialsNames = existingMaterials.map(
    (category) => category.name
  )
  uniqueMaterials = uniqueMaterials.filter(
    (material) => !existingMaterialsNames.includes(material.name)
  );

  if (uniqueMaterials.length !== 0) {
    await knex("materials").insert(uniqueMaterials)
  }
}
