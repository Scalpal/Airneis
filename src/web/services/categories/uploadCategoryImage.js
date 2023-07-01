import routes from "@/web/routes";
import getApiClient from "../getApiClient";


const uploadCategoryImage = async(categoryId, file) => {
  const reqInstance = getApiClient();
  const url = process.env.API_URL + routes.api.categories.upload(categoryId);
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await reqInstance.post(url, formData);

    return [null, response];
  } catch (error) {
    return Array.isArray(error) ? error : [error];
  }
};

export default uploadCategoryImage;