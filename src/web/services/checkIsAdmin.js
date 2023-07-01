import { AxiosError } from "axios";
import getApiClient from "./getApiClient";
import routes from "../routes";

const checkIsAdmin = async(context) => {
  const reqInstance = getApiClient(context);

  try {
    const {
      data: { user }
    } = await reqInstance.get(
      `${process.env.API_URL}/${routes.api.users.self()}`
    );

    if (!user.isAdmin) {
      return {
        redirect: {
          destination: "/",
          permanent: false
        }
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        redirect: {
          destination: "/",
          permanent: false
        }
      };
    }
  }
};

export default checkIsAdmin; 