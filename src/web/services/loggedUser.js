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
    } catch (error) {
      return error
    }
  }

export default resetPassword
