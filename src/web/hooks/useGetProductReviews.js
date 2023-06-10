import useSWR from "swr"; 
import routes from "../routes";
import Axios from "axios";

const fetcher = async (url) => {
  try {
    const { data } = await Axios.get(url); 

    return data.reviews; 
  } catch (error) {
    return [];
  }
};

const useGetProductReviews = (productId) => {
  const { data, error, isLoading } = useSWR(routes.api.products.reviews(productId), fetcher);

  return {
    productReviewsData: data,
    productReviewsError: error,
    productReviewsLoading: isLoading
  };
};

export default useGetProductReviews;