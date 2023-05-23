import routes from "@/web/routes.js"
import { AxiosError } from "axios"

const crypt =
  ({ api }) =>
  async (CryptoValues) => {
    const arr = JSON.stringify([{ key: "PL" }, "RU"])

    try {
      const {
        data: { CryptoKey },
      } = await api.get(routes.api.crypt(), {
        params: {
          arr,
        },
      })

      return CryptoKey
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default crypt
