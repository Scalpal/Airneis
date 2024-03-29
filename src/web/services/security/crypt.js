import routes from "@/web/routes.js";

const crypt =
  ({ api }) =>
  async (CryptoValues) => {
    try {
      const {
        data: { CryptoKey },
      } = await api.get(routes.api.security.crypt(), {
        params: {
          CryptoValues: JSON.stringify(CryptoValues),
        },
      });

      return CryptoKey;
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong";

      return [Array.isArray(error) ? error : [error]];
    }
  };

export default crypt;
