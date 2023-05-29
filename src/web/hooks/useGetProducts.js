import useSWRInfinite from "swr/infinite"; 
import routes from "../routes";
import getApiClient from "../services/getApiClient";
import { AxiosError } from "axios";
import { createQueryString } from "../services/createQueryString";

const getKey = (pageIndex, previousPageData, appliedQueryParams) => {
  const queryString = createQueryString(appliedQueryParams);

  // Reached the end 
  if (previousPageData && !previousPageData.products.length) {return null;}
  
  return `http://localhost:3000/${routes.api.products.collection(queryString, pageIndex + 1)}`;
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

const useGetProducts = (appliedQueryParams) => {
  const { data, error, isLoading, isValidating, size, setSize } = useSWRInfinite((pageIndex, previousPageData) =>
    getKey(pageIndex, previousPageData, appliedQueryParams), fetcher, { revalidateOnFocus: false });

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