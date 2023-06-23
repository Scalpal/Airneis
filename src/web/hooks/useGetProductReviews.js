import useSWR from "swr"; 
import Axios from "axios";

const fetcher = async (url) => {
  try {
    const { data: { reviews, count } } = await Axios.get(url); 

    return {
      reviews: reviews,
      count: count
    }; 
  } catch (error) {
    return [];
  }
};

const useGetProductReviews = (url) => {
  const config = {
    revalidatonOnFocus: false
  };

  const { data, error, isLoading } = useSWR(url, fetcher, config);

  return {
    productReviewsData: data,
    productReviewsError: error,
    productReviewsLoading: isLoading
  };
};

export default useGetProductReviews;