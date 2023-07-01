import routes from "@/web/routes";
import getApiClient from "../getApiClient";


const deleteCategory = async(categoryId) => {
  const reqInstance = getApiClient();
  const url = process.env.API_URL + routes.api.categories.single(categoryId);

  try {
    const response = await reqInstance.delete(url);

    return [null, response];
  } catch (error) {
    return Array.isArray(error) ? error : [error];
  }
};

export default deleteCategory;