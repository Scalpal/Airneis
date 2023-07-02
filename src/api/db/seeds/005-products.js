import { faker } from "@faker-js/faker";

export const seed = async (knex) => {
  const genericProducts = [
    {
      name: "Aria Dining Table",
      description: "Featuring a sleek glass top supported by a solid wood base, this contemporary dining table adds a touch of elegance to any dining space.",
      category: "Dining",
      material: "Wood, Metal, Glass, Stone/Marble, Composite materials"
    },
    {
      name: "Hudson Leather Sofa",
      description: "Crafted with genuine leather upholstery and a sturdy wooden frame, this sofa offers both comfort and durability. Its modern design with clean lines adds a stylish touch to any living room.",
      category: "Seating",
      material: "Wood, Metal, Leather, Fabric, Upholstery"
    },
    {
      name: "Luna Upholstered Bed",
      description: "This luxurious upholstered bed features a padded headboard and sleek wooden legs, providing a cozy and stylish focal point for your bedroom.",
      category: "Beds",
      material: "Wood, Metal, Leather, Fabric, Upholstery"
    },
    {
      name: "Harper Bookshelf",
      description: "Constructed with a sturdy metal frame and wooden shelves, this bookshelf combines functionality with a modern industrial aesthetic, offering ample storage for books and decor items.",
      category: "Storage",
      material: "Wood, Metal, Glass, Composite materials"
    },
    {
      name: "Palermo Outdoor Armchair",
      description: "Made with a durable aluminum frame wrapped in weather-resistant wicker, this outdoor armchair comes with plush cushions for comfort and is perfect for enjoying your patio or garden.",
      category: "Outdoor",
      material: "Metal, Wicker/Rattan, Upholstery"
    },
    {
      name: "Caden TV Stand",
      description: "Featuring a combination of wood and metal elements, this TV stand offers a contemporary design with open shelving and concealed storage compartments, ideal for organizing your entertainment essentials.",
      category: "Entertainment",
      material: "Wood, Metal, Glass, Composite materials"
    },
    {
      name: "Linden Writing Desk",
      description: "This sleek and functional writing desk features a minimalist design with a wooden top supported by metal legs. It provides a spacious workspace for productivity in your home office.",
      category: "Office",
      material: "Wood, Metal, Glass, Composite materials"
    },
    {
      name: "Eames Dining Chair",
      description: "This iconic dining chair showcases a molded plastic seat on a metal or wooden base, combining style and comfort to create a timeless piece for your dining area.",
      category: "Dining",
      material: "Wood, Metal, Upholstery, Leather, Fabric"
    },
    {
      name: "Adventure Bunk Bed",
      description: "Designed with safety and fun in mind, this bunk bed features a sturdy metal frame, built-in ladder, and colorful upholstery accents, creating a playful sleeping solution for kids' bedrooms.",
      category: "Kids",
      material: "Wood, Metal, Plastic, Upholstery"
    },
    {
      name: "Aria Table Lamp",
      description: "This elegant table lamp features a wooden or metal base with a glass globe shade, providing a warm and atmospheric glow to your living space.",
      category: "Lighting",
      material: "Wood, Metal, Glass, Plastic"
    }
  ];

  const loop = genericProducts.length;

  const createSlug = (string) => string.split(" ").join("-").toLowerCase();

  const products = [];
  for (let i = 0; i < loop; i++) {
    const [categoryId] = await knex("categories")
      .where({ name: genericProducts[i].category })
      .returning("id");
        
    const productName = genericProducts[i].name;
    const slug = createSlug(productName);

    products.push({
      name: productName,
      description: genericProducts[i].description,
      slug: slug,
      price: faker.commerce.price({ min: 10, max: 1000, dec: 0 }),
      stock: faker.number.int(100),
      categoryId: categoryId.id
    });
  }
  const productIds = await knex("products")
    .insert(products)
    .returning("id");

  const productsImages = [];
  for (let i = 0; i < loop; i++) {
    productsImages.push({
      imageSrc: "/meuble-2.jpeg",
      productId: productIds[i].id
    });
  }
  await knex("products_images").insert(productsImages);

  const productsMaterialsRelation = [];
  for (let i = 0; i < loop; i++) {
    const materailList = genericProducts[i].material;
    const materialIds = await knex("materials")
      .whereIn("name", materailList.split(", "))
      .returning("id");
    
    for (let j = 0; j < materialIds.length; j++) {
      productsMaterialsRelation.push({
        productId: productIds[i].id,
        materialId: materialIds[j].id
      });
    }
  }
  await knex("products_materials_relation").insert(productsMaterialsRelation);
};
