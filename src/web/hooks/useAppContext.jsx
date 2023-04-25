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

  const addToCart = useCallback((product) => {
    if (typeof window !== "undefined" && window.localStorage) {
      const localStorageProducts = JSON.parse(localStorage.getItem("products"));

      // Create the array of products in localStorage (init an array of products on first add)
      if (!Array.isArray(localStorageProducts)) {
        const arrayProducts = []; 

        product.quantity = 1; 
        arrayProducts.push(product);
        localStorage.setItem("products", JSON.stringify(arrayProducts));
        setCart(arrayProducts);

        return; 
      }
      
      const productIndex = localStorageProducts.findIndex((elt) => elt.id === product.id);

      // If product is not already in the cart, we add it
      if (productIndex === -1) {
        product.quantity = 1; 
        localStorage.setItem("products", JSON.stringify([...localStorageProducts, product]));
        setCart([...cart, product]);

        return;
      }

      //Otherwise, we increment it's quantity
      localStorageProducts[productIndex].quantity++; 
      localStorage.setItem("products", JSON.stringify(localStorageProducts));
      setCart(localStorageProducts);
    }
  }, [cart, setCart]);

  const deleteProductFromCart = useCallback((product) => {
    const localStorageProducts = JSON.parse(localStorage.getItem("products"));

    const updatedLocalStorageProducts = localStorageProducts.filter((elt) => elt.id !== product.id);
    localStorage.setItem("products", updatedLocalStorageProducts); 
    setCart(updatedLocalStorageProducts); 
  }, [setCart]); 

  const removeProductFromCart = useCallback((product) => {
    const localStorageProducts = JSON.parse(localStorage.getItem("products"));

    const productIndex = localStorageProducts.findIndex((elt) => elt.id === product.id);
    const currentProduct = localStorageProducts[productIndex];

    if (currentProduct.quantity - 1 === 0) {
      deleteProductFromCart(product);
      return;
    }

    localStorageProducts[productIndex].quantity--;
    localStorage.setItem("products", localStorageProducts); 
    setCart(localStorageProducts); 

  }, [deleteProductFromCart, setCart]);

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
        setCart,
        addToCart,
        removeProductFromCart,
        deleteProductFromCart
      },
      state: {
        session,
        cart
      },
    };
  }, [cart, session, signUp, signIn, signOut, setCart, addToCart, removeProductFromCart, deleteProductFromCart]);

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
