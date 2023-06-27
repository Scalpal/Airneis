import routes from "@/web/routes";
import getApiClient from "../getApiClient";

const addProduct = async(values) => {
  const reqInstance = getApiClient();
  const url = routes.api.products.add();

  try {
    const { data } = await reqInstance.post(url, values);

    return [null, data]; 
  } catch (error) {
    return Array.isArray(error) ? error : [error]; 
  }
};

export default addProduct;