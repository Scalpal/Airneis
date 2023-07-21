import useSWR from "swr"; 
import routes from "../routes";
import { parseCookies } from "nookies";
import Axios from "axios";

const fetcher = async (url) => {
  const { token } = parseCookies(); 

  const reqInstance = Axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  try {
    const { data } = await reqInstance.get(url); 

    return data.user; 
  } catch (err) {
    return err;
  }
};

export const useUser = () => {
  const url = routes.api.users.self();
  const config = {
    revalidateOnFocus: false
  };

  const { data, error, isLoading } = useSWR(url, fetcher, config);

  return {
    userData: data,
    userError: error,
    userIsLoading: isLoading
  };
};