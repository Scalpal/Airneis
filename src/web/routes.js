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
  api: {
    crypt: () => "/security/cryptoKey",
    resetPassword: () => "/users/reset-password",
    activate: () => "/mail/confirmation",
    mailResetPassword: () => "/mail/reset-password",
    signUp: () => "/users/register",
    signIn: () => "/users/login",
    posts: {
      collection: (query) => createRouteWithQueryParams("/posts", query),
      single: (postId, query) =>
        createRouteWithQueryParams(`/posts/${postId}`, query),
    },
  },
};

export default routes;
