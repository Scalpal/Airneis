import { faker } from "@faker-js/faker";

export const seed = async (knex) => {
  const genericProducts = [
    {
      name: "Chair",
      description:
        "Furniture designed for seating, typically with a backrest and four legs.",
    },
    {
      name: "Sofa",
      description:
        "Large, upholstered seating furniture that can accommodate multiple people.",
    },
    {
      name: "Table",
      description:
        "Flat surfaces supported by legs or a base, used for various purposes like dining or working.",
    },
    {
      name: "Bed",
      description:
        "Furniture for sleeping, consisting of a frame and a mattress.",
    },
    {
      name: "Dresser",
      description:
        "Storage furniture with drawers for keeping clothes and personal items.",
    },
    {
      name: "Cabinet",
      description:
        "Storage units with doors and shelves for storing various items.",
    },
    {
      name: "Bookcase",
      description:
        "Furniture with multiple shelves designed for organizing and displaying books.",
    },
    {
      name: "Desk",
      description:
        "Furniture for working or studying, typically with a flat surface and drawers or compartments.",
    },
    {
      name: "Shelf",
      description:
        "Wall-mounted or freestanding units with horizontal surfaces for displaying or storing items.",
    },
    {
      name: "Wardrobe",
      description:
        "Large, standalone closets with space for hanging clothes and storing accessories.",
    },
    {
      name: "Bench",
      description:
        "Long seats with or without backs, often used in dining areas or entryways.",
    },
    {
      name: "Stool",
      description:
        "Compact seats without armrests or backs, usually used at bars or high tables.",
    },
    {
      name: "Ottoman",
      description:
        "Low, upholstered seats that can serve as footrests or extra seating.",
    },
    {
      name: "Coffee table",
      description:
        "Low tables placed in front of sofas or chairs for holding drinks and other items.",
    },
    {
      name: "Dining table",
      description:
        "Tables specifically designed for dining, often with enough space for multiple people.",
    },
    {
      name: "Sideboard",
      description:
        "Long, low cabinets used for storing and serving dishes and tableware in dining areas.",
    },
    {
      name: "TV stand",
      description:
        "Furniture designed to hold and support televisions and other media devices.",
    },
    {
      name: "Entertainment center",
      description:
        "Larger furniture units that provide storage and space for multimedia equipment.",
    },
    {
      name: "Nightstand",
      description:
        "Small bedside tables with drawers or shelves for keeping essentials within reach.",
    },
    {
      name: "Bar stool",
      description: "Tall stools designed for use at bars or high counters.",
    },
  ];

  const loop = genericProducts.length;

  const categoryIds = await knex("categories").pluck("id");
  const products = [];
  for (let i = 0; i < loop; i++) {
    const randomCategoryId = faker.helpers.arrayElement(categoryIds);
    products.push({
      name: genericProducts[i].name,
      description: genericProducts[i].description,
      price: faker.commerce.price({ min: 10, max: 10000, dec: 0 }),
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
