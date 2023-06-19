import useSWR from "swr"
import routes from "../routes"
import Axios from "axios"
 
const fetcher = async (url) => {
  try {
    const { data } = await Axios.get(url)

    return data
  } catch (error) {
    return null
  }
}

const useSearchProducts = (searchValue) => {
  const { data, isLoading } = useSWR(`${process.env.API_URL}${routes.api.products.search(searchValue)}`, fetcher)

  return {
    searchData: data,
    searchLoading: isLoading
  }
}

export default useSearchProducts