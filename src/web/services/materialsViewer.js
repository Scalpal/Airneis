import routes from "@/web/routes.js"

const productsViewer =
  ({ api }) =>
  async () => {
    try {
      const { data: result } = await api.get(routes.api.allmaterials())

      return [result]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default productsViewer
