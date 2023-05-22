import routes from "@/web/routes.js"
import { AxiosError } from "axios"

const crypt =
  ({ api }) =>
  async (CryptoValues) => {
    try {
      const {
        data: { CryptoKey },
      } = await api.post(routes.api.crypt(), {
        CryptoValues,
      })

      return CryptoKey
    } catch (err) {
      if (error instanceof AxiosError) {
        return [Array.isArray(error) ? error : [error]]
      }

      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default crypt
