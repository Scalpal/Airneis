const createRouteWithQueryParams = (route, query) => {
  if (!query) {
    return route;
  }

  const qs = new URLSearchParams(query).toString();

  return `${route}?${qs}`;
};

const routes = {
  home: () => "/",
  register: () => "/register",
  login: () => "/login",
  cart: () => "/cart",
  profil: () => "/profil",
  order: () => "/order",
  products: () => "/products",
  categories: () => "/category",
  delivery: () => "/order/delivery",
  query: {
    category: (query) => "/category/" + query,
    products: (query) => "/products/" + query,
  },
  params: {
    products: (query) => createRouteWithQueryParams("/products", query),
  },
  resetPassword: () => "/reset-password",
  api: {
    register: () => "/users/register",
    login: () => "/users/login",
    allProducts: (query) => createRouteWithQueryParams("/products/getProducts", query),
    // posts: {
    //   collection: (query) => createRouteWithQueryParams("/posts", query),
    //   single: (postId, query) =>
    //     createRouteWithQueryParams(`/posts/${postId}`, query),
    // },
  },
};

export default routes;
