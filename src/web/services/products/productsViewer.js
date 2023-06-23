import routes from "@/web/routes.js";

const productsViewer =
  ({ api }) =>
  async (values) => {
    if (values.materials?.length) {
      values.materials = values.materials
        .map((value) => `material=${value}`)
        .join("&");
    }

    if (values.categories?.length) {
      values.categories = values.categories
        .map((value) => `material=${value}`)
        .join("&");
    }

    try {
      const { data: result } = await api.get(routes.api.products(), {
        params: values,
      });

      return [null, result];
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong";

      return [Array.isArray(error) ? error : [error]];
    }
  };

export default productsViewer;
