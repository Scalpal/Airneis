import routes from "@/web/routes";

const signUp = ({ api }) =>
  async (values) => {
    try {
      const { data } = await api.post(routes.api.register(), values);

      return [null, data];
    } catch (error) {
      return [Array.isArray(error) ? error : [error]];
    }
  };

export default signUp;
