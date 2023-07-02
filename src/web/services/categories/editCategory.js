import routes from "@/web/routes";
import getApiClient from "../getApiClient";


const editCategory = async(categorySlug, body) => {
  const reqInstance = getApiClient();
  const url = process.env.API_URL + routes.api.categories.single(categorySlug);

  try {
    const response = await reqInstance.patch(url, body);

    return [null, response];
  } catch (error) {
    return Array.isArray(error) ? error : [error];
  }
};

export default editCategory;