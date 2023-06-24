import routes from "@/web/routes";
import getApiClient from "../../getApiClient";


const updateHomeCarouselImage = async(imageId, visible) => {
  const reqInstance = getApiClient();
  const url = process.env.API_URL + routes.api.images.homeCarousel.single(imageId);
  const body = {
    visible
  };

  try {
    const response = await reqInstance.patch(url, body);
    
    return [null, response];
  } catch (error) {
    return Array.isArray(error) ? error : [error];
  }
};

export default updateHomeCarouselImage;