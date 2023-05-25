const createRouteWithParams = (route, params) => {
  console.log(params)

  if (!params) {
    return route
  }

  const qs = new URLSearchParams(params).toString()

  return `${route}?${qs}`
}

const routes = {
  pages: {
    home: () => "/",
    signUp: () => "/signUp",
    signIn: () => "/signIn",
    cart: () => "/cart",
    profil: () => "/profil",
    order: () => "/order",
    products: () => "/products",
    categories: () => "/category",
    delivery: () => "/order/delivery",
    resetPassword: () => "/reset-password",
    // backoffice: {
    //   base: () => "/backoffice",
    //   users: {
    //     single: (userId) =>
    //       createRouteWithQueryParams(`/backoffice/users/${userId}`),
    //   },
    //   products: {
    //     add: () => "/backoffice/products/add",
    //     single: (productId) =>
    //       createRouteWithQueryParams(`/backoffice/products/${productId}`),
    //   },
    // },
  },
  paramsPage: {
    products: (params) => createRouteWithParams("/products", params),
    mailSent: (params) => createRouteWithParams("/mails/sent", params),
  },
  queryPage: {
    category: (query) => "/category/" + query,
    products: (query) => "/products/" + query,
  },
  api: {
    signUp: () => "/users/signUp",
    login: () => "/users/login",
    confirmAccount: () => "/users/activate",
    crypt: () => "/security/crypt",
    mailResetPassword: () => "/mail/reset-password",
    resetPassword: () => "/users/reset-password",
    allcategories: () => "/categories/getCategories",
    allmaterials: () => "/materials/getMaterials",
    allProducts: () => "/products/getProducts",
    mails: {
      resetPassword: () => "/mail/reset-password",
    },
    // posts: {
    //   collection: (query) => createRouteWithQueryParams("/posts", query),
    //   single: (postId, query) =>
    //     createRouteWithQueryParams(`/posts/${postId}`, query),
    // },
  },
}

export default routes
