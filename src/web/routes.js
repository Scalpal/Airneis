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
  cgu: () => "terms-of-use",
  legalMentions: () => "/legal-mentions",
  email: {
    sent: () => "/mails/sent"
  },
  contact: () => "/contact",
  products: {
    base: () => `/products`,
    single: (productSlug) => `/products/${productSlug}`
  },
  categories: {
    base: () => "/categories",
    single: (categorySlug) => `/categories/${categorySlug}`
  },
  backoffice: {
    base: () => "/backoffice",
    users: () => "/backoffice/users",
    products: () => "/backoffice/products",
    shop: () => "/backoffice/shop"
  },
  api: {
    register: () => "/users/register",
    login: () => "/users/login",
    products: {
      base: () => "/api/products",
      single: (productSlug, query) =>
        createRouteWithQueryParams(`/api/products/${productSlug}`, query),
      // collection: (queryString, page) =>
      //   `/api/products${queryString ? queryString : ""}${
      //     page ? `page=${page}` : ""
      //   }`,
      collection: (queryString, page) => createRouteWithQueryParams(`/api/products`, queryString + `&page=${page}`),
      search: (searchValue) =>
        `/api/products?limit=30&${
          searchValue.length > 0 ? `search=${searchValue}` : ""
        }`,
      materials: () => "/api/products/materials",
      reviews: (productSlug, limit, page) =>
        `/api/products/${productSlug}/reviews?limit=${limit}&page=${page}`,
      addImage: (productSlug) => `/api/products/${productSlug}/images`,
      deleteImage: (productId) => `/api/products/${productId}/deleteImage`
    },
    images: {
      homeCarousel: {
        base: (queryString) =>
          `/api/images/homeCarousel${queryString ? queryString : ""}`,
        single: (imageId) => `/api/images/homeCarousel/${imageId}`,
        upload: () => "/api/images/homeCarousel/upload"
      }
    },
    categories: {
      // base: (queryString) =>
        // `/api/products/categories${queryString ? queryString : ""}`,
      base: (queryString) => createRouteWithQueryParams("/api/products/categories", queryString),
      single: (categorySlug) => `/api/products/categories/${categorySlug}`,
      upload: (categorySlug) => `/api/products/categories/${categorySlug}/upload`,
      products: (categoryId) => `/api/products?categories=${categoryId}`
    },
    mails: {
      resetPassword: () => "/mail/reset"
    },
    users: {
      resetPassword: () => "/users/reset",
      confirmAccount: () => "/users/activate",
      collection: (query) => createRouteWithQueryParams("/api/users", query),
      single: (userId, query) => createRouteWithQueryParams(`/api/users/${userId}`, query),
      self: () => "/api/users/self",
      patch: (userId) => createRouteWithQueryParams(`/users/${userId}`),
      delete: (userId) => createRouteWithQueryParams(`/users/${userId}`)
    }
  }
};

export default routes;
