import { parseCookies } from "nookies"
import Axios from "axios"

const getApiClient = (context) => {
  const { token } = parseCookies(context)

  const reqInstance = Axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

export default getApiClient
