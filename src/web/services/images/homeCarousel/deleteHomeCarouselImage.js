import routes from "@/web/routes";
import getApiClient from "../../getApiClient";



const deleteHomeCarouselImage = async (id, imageName) => {
  const reqInstance = getApiClient();
  const url = process.env.API_URL + routes.api.images.homeCarousel.base();
  const body = {
    id,
    imageName
  };

  try {
    const response = await reqInstance.patch(url, body);
    
    return [null, response];
  } catch (error) {
    return Array.isArray(error) ? error : [error];
  }
};

export default deleteHomeCarouselImage;