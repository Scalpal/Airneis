import routes from "@/web/routes.js"

const productsViewer =
  ({ api }) =>
  async (values) => {
    try {
      const { data: result } = await api.post(routes.api.allProducts(), values)

      return [null, result]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default productsViewer
