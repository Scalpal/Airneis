import config from "@/web/config.js";
import parseSession from "@/web/parseSession.js";
import routes from "@/web/routes.js";
import { AxiosError } from "axios";

const signIn = ({ api, setSession, setJWT }) =>
  async (values) => {
    console.log("values : ",values);

    try {
      const { data: { result: jwt } } = await api.post(routes.api.login(), values);
      
      setSession(parseSession(jwt));
      setJWT(jwt);
      localStorage.setItem(config.session.localStorageKey, jwt);

      return [null, true];
      
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response);
      }

      return [Array.isArray(error) ? error : [error]];
    }
  };

export default signIn;
