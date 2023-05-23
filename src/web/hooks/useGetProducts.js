import useSWRInfinite from "swr/infinite"; 
import routes from "../routes";
import getApiClient from "../services/getApiClient";
import { AxiosError } from "axios";

const getKey = (pageIndex, previousPageData) => {
  // Reached the end 
  if (previousPageData && !previousPageData.products.length) return null;
  
  return `http://localhost:3000${routes.api.products.collection()}?page=${pageIndex + 1}`;
};

const fetcher = async(url) => {
  const reqInstance = getApiClient();

  try {
    const { data: { products, count } } = await reqInstance.get(url);

    return { products, count }; 
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response); 
    }
  }
};

const useGetProducts = () => {
  const { data, error, isLoading, isValidating, size, setSize } = useSWRInfinite(getKey, fetcher);

  return {
    data,
    error,
    isLoading,
    isValidating,
    size,
    setSize
  };
};

export default useGetProducts;