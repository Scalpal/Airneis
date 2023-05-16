import routes from "@/web/routes.js";
import { AxiosError } from "axios";

const productsViewer =
  ({ api }) =>
    async () => {
      try {
        const { data: result } = await api.get(routes.api.allProducts());

        return result;
      } catch (err) {
        if (error instanceof AxiosError) {
          console.log(error.response);
        }
        const error = err.response?.data?.error || "Oops. Something went wrong";

        return [Array.isArray(error) ? error : [error]];
      }
    };

export default productsViewer;
