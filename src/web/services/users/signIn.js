import parseSession from "@/web/parseSession.js";
import routes from "@/web/routes.js";
import { setCookie } from "nookies";

const signIn =
  ({ api, setSession, setJWT }) =>
  async (values) => {
    try {
      const {
        data: { result: jwt },
      } = await api.post(routes.api.login(), values);

      setSession(parseSession(jwt));
      setJWT(jwt);
      setSession(parseSession(jwt));
      setJWT(jwt);

      // Stock the token in cookies for 30 days
      setCookie(null, "token", jwt, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      });

      return [null, true];
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong";

      return [Array.isArray(error) ? error : [error]];
      return [Array.isArray(error) ? error : [error]];
    }
  };
  };

export default signIn;
export default signIn;
