import routes from "@/web/routes.js"

const mailResetPassword =
  ({ api }) =>
  async ({ email }) => {
    try {
      const {
        data: { result },
      } = await api.get(routes.api.mails.resetPassword(), {
        params: { email },
      })

      return [null, result]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default mailResetPassword
