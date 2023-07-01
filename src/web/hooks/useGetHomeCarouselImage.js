import useSWR from "swr";
import routes from "../routes";
import Axios from "axios";
import { createQueryString } from "../services/createQueryString";

const fetcher = async (url) => {
  try {
    const { data } = await Axios.get(url);

    return data.images;
  } catch (error) {
    return [];
  }
};

const useGetHomeCarouselImage = (queryParams) => {
  const queryString = createQueryString(queryParams ? queryParams : {});

  const url = process.env.API_URL + routes.api.images.homeCarousel.base(queryString);
  const config = {
    revalidateOnFocus: false
  };

  const { data, error, isLoading, mutate } = useSWR(url, fetcher, config);

  return {
    carouselImageData: data,
    carouselImageError: error,
    carouselImageIsLoading: isLoading,
    refreshCarouselImages: mutate
  };
};

export default useGetHomeCarouselImage;