import awsImages from "./productImages.json";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const seed = async (knex) => {
  const categories = await knex("categories");
  const products = await knex("products");
  const productImages = awsImages;

  const productsImagesToAdd = [];

  // Loop on each category
  categories.map((category) => {
    // Loop on each product of the category
    products.filter((elt) => elt.categoryId === category.id).map((product) => {
      // Add 2 images for each product
      for (let i = 0; i < 2; i++) {
        const imageUrl = productImages[category.name][getRandomInt(productImages[category.name].length - 1)] ;

        productsImagesToAdd.push({
          imageSrc: imageUrl,
          productId: product.id
        });
      }
    });
  });

  await knex("products_images").insert(productsImagesToAdd);
};
