import routes from "@/web/routes.js"

const crypt =
  ({ api }, session) =>
  async (CryptoValues) => {
    console.log(session)

    try {
      const {
        data: { CryptoKey },
      } = await api.get(routes.api.crypt(), {
        params: {
          CryptoValues: JSON.stringify(CryptoValues),
        },
      })

      return CryptoKey
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default crypt
