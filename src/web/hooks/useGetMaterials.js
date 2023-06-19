import useSWR from "swr" 
import routes from "../routes"
import getApiClient from "../services/getApiClient"

const fetcher = async (url) => {
  const reqInstance = getApiClient() 

  const { data } = await reqInstance.get(url) 

  return data.materials 
}

export const useGetMaterials = () => {
  const { data, error, isLoading } = useSWR(`${process.env.API_URL}${routes.api.products.materials()}`, fetcher, { revalidateOnFocus: false })

  return {
    materialsData: data,
    materialsError: error,
    materialsIsLoading: isLoading
  }
}