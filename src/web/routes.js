const createRouteWithParams = (route, params) => {
  if (!params) {
    return route
  }

  const qs = new URLSearchParams(params).toString()

  return `${route}?${qs}`
}

const routes = {
  home: () => "/",
  register: () => "/register",
  login: () => "/login",
  products: {
    base: () => `/products`,
    single: (productId) => `/products/${productId}`,
  },
  categories: {
    base: () => "/category",
    single: (categoryId) => `/category/${categoryId}`
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
    signUp: () => "/users/signUp",
    login: () => "/users/login",
    products: {
      collection: (queryString, page) => `/api/products${queryString ? queryString : ""}${page ? `page=${page}` : ""}`,
      single: (productId, query) => createRouteWithQueryParams(`/api/products/${productId}`, query),
      search: (searchValue) => `/api/products?limit=30&${searchValue.length > 0 ? `search=${searchValue}` : ""}`,
      update: (productId) => `/products/${productId}`,
      materials: () => "/api/products/materials",
      add: () => "/products",
      reviews: (productId, limit, page) => `/api/products/${productId}/reviews?limit=${limit}&page=${page}`
    },
    categories: {
      base: () => "/api/products/categories",
      products: (categoryId) => `/api/products?categories=${categoryId}`
    },
    // posts: {
    //   collection: (query) => createRouteWithQueryParams("/posts", query),
    //   single: (postId, query) =>
    //     createRouteWithQueryParams(`/posts/${postId}`, query),
    // },
  },
}

export default routes
