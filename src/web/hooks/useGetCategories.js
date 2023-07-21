import useSWR from "swr";
import routes from "../routes";
import getApiClient from "../services/getApiClient";
import { createQueryString } from "../services/createQueryString";

const fetcher = async (url) => {
  const reqInstance = getApiClient();

  try {
    const { data } = await reqInstance.get(url);

    return data.categories;
  } catch (error) {
    console.log(error);
    
    return [];
  }
};

export const useGetCategories = (queryParams) => {
  const queryString = createQueryString(queryParams ? queryParams : {});

  const url = process.env.API_URL + routes.api.categories.base(queryString);
  const config = { revalidateOnFocus: false };

  const { data, error, isLoading, mutate } = useSWR(url, fetcher, config);

  return {
    categoriesData: data,
    categoriesError: error,
    categoriesIsLoading: isLoading,
    refreshCategories: mutate
  };
};
