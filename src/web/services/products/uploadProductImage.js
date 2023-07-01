import routes from "@/web/routes";
import getApiClient from "../getApiClient";

const uploadProductImage = async (file, productSlug) => {
  const formData = new FormData();
  formData.append("file", file);

  const reqInstance = getApiClient();
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json"
    }
  };
  const url = `${process.env.API_URL}${routes.api.products.addImage(productSlug)}`;

  try {
    const response = await reqInstance.post(url, formData, config);

    return [null, response];
  } catch (error) {
    return [Array.isArray(error) ? error : [error]];
  }
}; 

export default uploadProductImage;