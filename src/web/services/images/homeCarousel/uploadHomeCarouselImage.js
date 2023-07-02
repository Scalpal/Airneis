import routes from "@/web/routes";
import getApiClient from "../../getApiClient";


const uploadHomeCarouselImage = async(file) => {
  const formData = new FormData();
  const reqInstance = getApiClient();
  const url = process.env.API_URL + routes.api.images.homeCarousel.upload();

  formData.append("file", file);

  try {
    const response = await reqInstance.post(url, formData);

    return [null, response];
  } catch (error) {
    return Array.isArray(error) ? error : [error];
  }
};

export default uploadHomeCarouselImage;