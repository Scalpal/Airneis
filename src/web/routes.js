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
  products: {
    base: () => `/products`,
    single: (productId) => `/products/${productId}`,
  },
  backoffice: {
    base: () => "/backoffice",
    users: {
      single: (userId) => createRouteWithQueryParams(`/backoffice/users/${userId}`)
    },
    products: {
      add: () => "/backoffice/products/add",
      single: (productId) => createRouteWithQueryParams(`/backoffice/products/${productId}`)
    }
  },
  api: {
    register: () => "/users/register",
    login: () => "/users/login",
    products: {
      collection: (queryString, page) => `/api/products${queryString ? queryString : ""}${page ? `page=${page}` : ""}`,
      single: (productId, query) =>
        createRouteWithQueryParams(`/api/products/${productId}`, query),
      update: (productId) => `/products/${productId}`,
      materials: () => "/api/products/materials",
      categories: () => "/api/products/categories",
      add: () => "/products",
      reviews: (productId) => `/api/products/${productId}/reviews`
    },

    users: {
      collection: (query) => createRouteWithQueryParams("/api/users", query),
      single: (userId, query) =>
        createRouteWithQueryParams(`/api/users/${userId}`, query),
      self: () => "/api/users/self",
      patch: (userId) => createRouteWithQueryParams(`/users/${userId}`),
      delete: (userId) => createRouteWithQueryParams(`/users/${userId}`)
    }
  },
};

export default routes;
