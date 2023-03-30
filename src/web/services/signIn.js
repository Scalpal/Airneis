import config from "@/web/config.js";
import parseSession from "@/web/parseSession.js";
import routes from "@/web/routes.js";

const signIn =
  ({ api, setSession, setJWT }) =>
  async ({ email, password, access }) => {
    try {
      const {
        data: { result: jwt },
      } = await api.post(routes.api.signIn(), {
        email,
        password,
        access,
      });
      setSession(parseSession(jwt));
      setJWT(jwt);
      localStorage.setItem(config.session.localStorageKey, jwt);
      return [null, true];
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong";

      return [Array.isArray(error) ? error : [error]];
    }
  };

export default signIn;
