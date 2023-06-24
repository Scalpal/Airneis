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
    register: () => "/users/register",
    login: () => "/users/login",
    products: {
      collection: (queryString, page) => `/api/products${queryString ? queryString : ""}${page ? `page=${page}` : ""}`,
      single: (productId, query) => createRouteWithQueryParams(`/api/products/${productId}`, query),
      search: (searchValue) => `/api/products?limit=30&${searchValue.length > 0 ? `search=${searchValue}` : ""}`,
      update: (productId) => `/products/${productId}`,
      materials: () => "/api/products/materials",
      add: () => "/products",
      reviews: (productId, limit, page) => `/api/products/${productId}/reviews?limit=${limit}&page=${page}`,
      productImage: (productId) => `/api/products/${productId}/images`,
      deleteImage: (productId) => `/api/products/${productId}/deleteImage` 
    },
    images: {
      homeCarousel: {
        base: (queryString) => `/api/images/homeCarousel${queryString ? queryString : ""}`,
        single: (imageId) => `/api/images/homeCarousel/${imageId}`,
        upload: () => "/api/images/homeCarousel/upload",
      }
    },
    categories: {
      base: () => "/api/products/categories",
      single: (categoryId) => `/api/products/categories/${categoryId}`,
      upload: (categoryId) => `/api/products/categories/${categoryId}/upload`,
      products: (categoryId) => `/api/products?categories=${categoryId}`,
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
