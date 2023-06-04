// import parseSession from "@/web/parseSession"
import routes from "@/web/routes.js"

const resetPassword =
  ({ api, session }) =>
  async () => {
    try {
      const {
        data: { user },
      } = await api.get(routes.api.users.single(session.user.id))

      return user
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default resetPassword
