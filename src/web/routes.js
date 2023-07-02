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
  reset: () => "/reset",
  email: {
    sent: () => "/mails/sent",
  },
  cgu: () => "terms-of-use",
  legalMentions: () => "/legal-mentions",
  products: {
    base: () => `/products`,
    single: (productSlug) => `/products/${productSlug}`,
  },
  categories: {
    base: () => "/category",
    single: (categoryId) => `/category/${categoryId}`,
  },
  backoffice: {
    base: () => "/backoffice",
    users: {
      single: (userId) =>
        createRouteWithQueryParams(`/backoffice/users/${userId}`),
    },
    products: {
      add: () => "/backoffice/products/add",
      single: (productId) =>
        createRouteWithQueryParams(`/backoffice/products/${productId}`),
    },
  },
  api: {
    register: () => "/users/register",
    login: () => "/users/login",
    security: {
      crypt: () => "/security/crypt",
    },
    products: {
      collection: (queryString, page) =>
        `/api/products${queryString ? queryString : ""}${
          page ? `page=${page}` : ""
        }`,
      single: (productId, query) =>
        createRouteWithQueryParams(`/api/products/${productId}`, query),
      search: (searchValue) =>
        `/api/products?limit=30&${
          searchValue.length > 0 ? `search=${searchValue}` : ""
        }`,
      update: (productId) => `/products/${productId}`,
      materials: () => "/api/products/materials",
      add: () => "/products",
      reviews: (productId, limit, page) =>
        `/api/products/${productId}/reviews?limit=${limit}&page=${page}`,
      productImage: (productId) => `/api/products/${productId}/images`,
      deleteImage: (productId) => `/api/products/${productId}/deleteImage`,
    },
    categories: {
      base: () => "/api/products/categories",
      products: (categoryId) => `/api/products?categories=${categoryId}`,
    },
    users: {
      resetPassword: () => "/users/reset",
      confirmAccount: () => "/users/activate",
      collection: (query) => createRouteWithQueryParams("/api/users", query),
      single: (userId, query) =>
        createRouteWithQueryParams(`/api/users/${userId}`, query),
      self: () => "/api/users/self",
      patch: (userId) => createRouteWithQueryParams(`/users/${userId}`),
      delete: (userId) => createRouteWithQueryParams(`/users/${userId}`),
    },
  },
};

export default routes;
