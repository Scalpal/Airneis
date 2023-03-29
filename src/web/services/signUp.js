import routes from "@/web/routes";

const signUp =
  ({ api }) =>
  async ({ email, firstName, lastName, password, phoneNumber }) => {
    try {
      const { data } = await api.post(routes.api.signUp(), {
        firstName,
        email,
        lastName,
        password,
        phoneNumber,
      });

      return [null, data];
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong";

      return [Array.isArray(error) ? error : [error]];
    }
  };

export default signUp;
