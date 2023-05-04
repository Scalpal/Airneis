import routes from "@/web/routes";
import { AxiosError } from "axios";

const signUp = ({ api }) =>
  async (values) => {
    try {
      const { data } = await api.post(routes.api.register(), values);

      return [null, data];
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response);
      }

      return [Array.isArray(error) ? error : [error]];
    }
  };

export default signUp;
