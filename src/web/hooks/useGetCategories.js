import useSWR from "swr"; 
import routes from "../routes";
import getApiClient from "../services/getApiClient";

const fetcher = async (url) => {
  const reqInstance = getApiClient(); 

  const { data } = await reqInstance.get(url); 

  return data.categories; 
};

export const useGetCategories = () => {
  const { data, error, isLoading, mutate } = useSWR(`${process.env.API_URL}${routes.api.categories.base()}`, fetcher, { revalidateOnFocus: false });

  return {
    categoriesData: data,
    categoriesError: error,
    categoriesIsLoading: isLoading,
    refreshCategories: mutate
  };
};