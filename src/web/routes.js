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
    base: (queryParams) => `/products${queryParams}`,
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
        createRouteWithQueryParams(`/products/${productId}`, query),
      materials: () => "/api/products/materials",
      categories: () => "/api/products/categories",
      add: () => "/products"
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
