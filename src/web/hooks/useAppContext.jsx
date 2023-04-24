import createAPIClient from "@/web/createAPIClient.js";
import parseSession from "@/web/parseSession.js";
import signInService from "@/web/services/signIn.js";
import signUpService from "@/web/services/signUp.js";
import config from "@/web/config";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AppContext = createContext();

export const AppContextProvider = (props) => {
  const { isPublicPage, ...otherProps } = props;
  const [session, setSession] = useState(null);
  const [jwt, setJWT] = useState(null);
  const api = createAPIClient({ jwt });

  const signUp = signUpService({ api });
  const signIn = signInService({ api, setSession, setJWT });
  const signOut = useCallback(() => {
    localStorage.removeItem(config.session.localStorageKey);
    setSession(false);
  }, []);

  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      return (localStorage.getItem("products") !== "undefined") && 
        (localStorage.getItem("products") !== "null") ?
        JSON.parse(localStorage.getItem("products")) : [];
    }
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const jwt = localStorage.getItem(config.session.localStorageKey);

    if (!jwt) {
      return;
    }

    const session = parseSession(jwt);

    setSession(session);
    setJWT({ jwt });
  }, []);

  const contextValues = useMemo(() => {
    return {
      actions: {
        signUp,
        signIn,
        signOut,
        setCart
      },
      state: {
        session,
        cart
      },
    };
  }, [cart, session, signUp, signIn, signOut, setCart]);

  if (!isPublicPage && session === null) {
    return (<span>Not Connected</span>);
  }

  return (
    <AppContext.Provider
      {...otherProps}
      value={contextValues}
    />
  );
};

const useAppContext = () => {
  const { state, actions } = useContext(AppContext);
  return { state, actions };
};

export default useAppContext;
