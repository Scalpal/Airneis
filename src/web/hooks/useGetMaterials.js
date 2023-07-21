import useSWR from "swr"; 
import routes from "../routes";
import getApiClient from "../services/getApiClient";

const fetcher = async (url) => {
  const reqInstance = getApiClient(); 

  const { data } = await reqInstance.get(url); 

  return data.materials; 
};

export const useGetMaterials = () => {
  const url = routes.api.products.materials();
  const config = { revalidateOnFocus: false };

  const { data, error, isLoading } = useSWR(url, fetcher, config);

  return {
    materialsData: data,
    materialsError: error,
    materialsIsLoading: isLoading
  };
};