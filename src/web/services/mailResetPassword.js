import routes from "@/web/routes.js";
import { AxiosError } from "axios";

const mailResetPassword =
  ({ api }) =>
    async ({ email }) => {
      try {
        const { data } = await api.get(routes.api.mailResetPassword(), {
          params: { email },
        });

        return [null, data];
      } catch (err) {
        if (error instanceof AxiosError) {
          console.log(error.response);
        }
        const error = err.response?.data?.error || "Oops. Something went wrong";

        return [Array.isArray(error) ? error : [error]];
      }
    };

export default mailResetPassword;
