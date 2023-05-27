import useSWR from "swr"; 
import routes from "../routes";
import getApiClient from "../services/getApiClient";

const fetcher = async (url) => {
  const reqInstance = getApiClient(); 

  const { data } = await reqInstance.get(url); 

  return data.categories; 
};

export const useGetCategories = () => {
  const { data, error, isLoading } = useSWR(routes.api.products.categories(), fetcher);

  return {
    categoriesData: data,
    categoriesError: error,
    categoriesIsLoading: isLoading
  };
};