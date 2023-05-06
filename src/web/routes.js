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
    posts: {
      collection: (query) => createRouteWithQueryParams("/posts", query),
      single: (postId, query) =>
        createRouteWithQueryParams(`/posts/${postId}`, query),
    },
    users: {
      collection: (query) => createRouteWithQueryParams("/users", query),
      single: (userId, query) =>
        createRouteWithQueryParams(`/users/${userId}`, query),
    }
  },
};

export default routes;
