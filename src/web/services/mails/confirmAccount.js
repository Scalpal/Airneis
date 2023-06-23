import routes from "@/web/routes.js";

const mailResetPassword =
  ({ api }) =>
  async (id) => {
    try {
      const {
        data: { result },
      } = await api.patch(routes.api.confirmAccount(), {
        id,
      });

      return [null, Array.isArray(result) ? result : [result]];
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong";

      return [Array.isArray(error) ? error : [error]];
    }
  };

export default mailResetPassword;
