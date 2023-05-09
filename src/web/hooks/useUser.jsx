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
  const { data } = await reqInstance.get(url); 

  return data.user; 
};

export const useUser = () => {

  const { data, error, isLoading } = useSWR(routes.api.users.self,(url) => fetcher(url));

  return {
    data: data,
    error: error,
    isLoading: isLoading
  };
};