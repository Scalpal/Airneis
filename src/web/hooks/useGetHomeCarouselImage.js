import useSWR from "swr";
import routes from "../routes";
import Axios from "axios";

const fetcher = async (url) => {
  try {
    const { data } = await Axios.get(url);

    return data.images;
  } catch (error) {
    return [];
  }
};

const useGetHomeCarouselImage = () => {
  const url = process.env.API_URL + routes.api.images.homeCarousel.base();
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