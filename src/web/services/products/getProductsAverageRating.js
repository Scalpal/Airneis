

const getProductsAverageRating = (products) => {
  const productsWithRatings = products.map((product) => {
    const avgRating = Math.round((product.reviews.reduce((acc, { rating }) => acc + rating, 0)) / product.reviews.length);

    product.rating = avgRating;

    return product;
  });

  return productsWithRatings;
};

export default getProductsAverageRating;