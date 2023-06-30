export const seed = async (knex) => {
  const genericMaterials = [
    "Wood",
    "Metal",
    "Glass",
    "Leather",
    "Fabric",
    "Plastic",
    "Wicker/Rattan",
    "Upholstery",
    "Stone/Marble",
    "Composite materials"
  ];

  const loop = genericMaterials.length;

  const materials = [];
  for (let i = 0; i < loop; i++) {
    materials.push({ name: genericMaterials[i] });
  }
  let uniqueMaterials = materials.filter(
    (material, i, self) =>
      i === self.findIndex((index) => index.name === material.name)
  );
  const existingMaterials = await knex("materials").select("name");
  const existingMaterialsNames = existingMaterials.map(
    (category) => category.name
  );
  uniqueMaterials = uniqueMaterials.filter(
    (material) => !existingMaterialsNames.includes(material.name)
  );

  if (uniqueMaterials.length !== 0) {
    await knex("materials").insert(uniqueMaterials);
  }
};
