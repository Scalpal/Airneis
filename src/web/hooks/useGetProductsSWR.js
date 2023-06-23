import useSWR from "swr"; 
import routes from "../routes";
import { createQueryString } from "../services/createQueryString";
import Axios from "axios"; 

const fetcher = async (url) => {
  try {
    const { data: { products, count } } = await Axios.get(url);
    
    return {
      products,
      count
    };
  } catch (error) {
    return {
      products: [],
      count: 0
    };
  }
}; 

const useGetProductsSWR = (queryParams) => {
  const queryString = createQueryString(queryParams); 

  const config = { revalidateOnFocus: false, revalidateOnMount: true };

  const { data, error, isLoading, mutate } = useSWR(`${process.env.API_URL}${routes.api.products.collection(queryString)}`, fetcher, config);

  return {
    productsData: data,
    productsError: error,
    productsIsLoading: isLoading,
    refreshProducts: mutate
  };
};

export default useGetProductsSWR; 