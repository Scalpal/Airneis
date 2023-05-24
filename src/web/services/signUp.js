import routes from "@/web/routes"

const signUp =
  ({ api }) =>
  async (values) => {
    try {
      const { data } = await api.post(routes.api.signUp(), values)

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default signUp
