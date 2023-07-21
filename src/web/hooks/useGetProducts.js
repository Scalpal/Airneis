import useSWRInfinite from "swr/infinite"; 
import routes from "../routes";
import getApiClient from "../services/getApiClient";
import { createQueryString } from "../services/createQueryString";

const getKey = (pageIndex, previousPageData, queryParams) => {
  const queryString = createQueryString(queryParams);

  // Reached the end 
  if (previousPageData && !previousPageData.products.length) { return null; }
    
  return process.env.API_URL + routes.api.products.collection(queryString, pageIndex + 1);
};

const fetcher = async(url) => {
  const reqInstance = getApiClient();

  try {
    const { data: { products, count } } = await reqInstance.get(url);

    return { products, count }; 
  } catch (error) {
    return { products: [], count: 0 };
  }
};

const useGetProducts = (queryParams) => {
  const { data, error, isLoading, isValidating, size, setSize } = useSWRInfinite((pageIndex, previousPageData) =>
    getKey(pageIndex, previousPageData, queryParams), fetcher, { revalidateOnFocus: false });

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