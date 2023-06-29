import routes from "@/web/routes";
import getApiClient from "../getApiClient";

const editShowInHome = async (productId, value) => {
  const reqInstance = getApiClient();
  const url = `${process.env.API_URL}${routes.api.products.single(productId)}`;
  const body = {
    showInHome: value
  };

  try {
    const { data } = await reqInstance.patch(url, body); 

    return [null, data]; 
  } catch (error) {
    return Array.isArray(error) ? error : [error]; 
  }
};

export default editShowInHome;