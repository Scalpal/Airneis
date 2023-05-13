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
  delivery: () => "/order/delivery",
  resetPassword: () => "/reset-password",
  termsAndConditions: () => "/terms-and-conditions", 
  api: {
    register: () => "/users/register",
    login: () => "/users/login",
    specificUser: (userId) => `api/users/${userId}`,
    posts: {
      collection: (query) => createRouteWithQueryParams("/posts", query),
      single: (postId, query) =>
        createRouteWithQueryParams(`/posts/${postId}`, query),
    },
  },
};

export default routes;
