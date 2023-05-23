import routes from "@/web/routes.js"

const crypt =
  ({ api }) =>
  async (CryptoValues) => {
    console.log(JSON.stringify(CryptoValues))
    const js = [5, 8, 7]

    try {
      const {
        data: { CryptoKey },
      } = await api.get(routes.api.crypt(), {
        params: {
          CryptoValues: JSON.stringify(js),
        },
      })

      return CryptoKey
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default crypt
