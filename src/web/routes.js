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
  api: {
    register: () => "/users/register",
    login: () => "/users/login",
    products: {
      collection: (query) => createRouteWithQueryParams("/api/products", query),
      single: (postId, query) =>
        createRouteWithQueryParams(`/api/products/${postId}`, query),
    },
    users: {
      collection: (query) => createRouteWithQueryParams("/api/users", query),
      single: (userId, query) =>
        createRouteWithQueryParams(`/api/users/${userId}`, query),
      self: () => "/api/users/self"
    }
  },
};

export default routes;
