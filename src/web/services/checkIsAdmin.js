import { AxiosError } from "axios"
import getApiClient from "./getApiClient"
import routes from "../routes"

const checkIsAdmin = async(context) => {

  const reqInstance = getApiClient(context);

//   try {
//     const {
//       data: { user },
//     } = await reqInstance.get(
//       `http://localhost:3000/${routes.api.users.self()}`
//     )

    if (!user.isAdmin) {
      return {
        redirect: {
          destination: "/home",
          permanent: false,
        },
      }
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response);
    }
  }
};
