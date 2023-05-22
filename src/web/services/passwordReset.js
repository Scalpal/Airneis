import routes from "@/web/routes.js"
import { AxiosError } from "axios"

const resetPassword =
  ({ api }) =>
  async ({ id, password, passwordConfirmation, timer }) => {
    try {
      const { data } = await api.patch(routes.api.resetPassword(), {
        id,
        password,
        passwordConfirmation,
        timer,
      })

      return [null, data]
    } catch (err) {
      if (error instanceof AxiosError) {
        return [Array.isArray(error) ? error : [error]]
      }

      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default resetPassword
