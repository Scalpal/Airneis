import createAPIClient from "@/web/createAPIClient.js"
import parseSession from "@/web/parseSession.js"
import prepareService from "@/web/prepareService"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { parseCookies } from "nookies"

const AppContext = createContext()

export const AppContextProvider = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { isPublicPage, ...otherProps } = props
  const [session, setSession] = useState(null)
  const [jwt, setJWT] = useState(null)
  const api = createAPIClient({ jwt })

  const services = prepareService({ api, setSession, setJWT, session })
  const signOut = useCallback(() => {
    document.cookie = "token" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    setSession(false)
  }, [])

  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem("products") !== "undefined" &&
        localStorage.getItem("products") !== "null"
        ? JSON.parse(localStorage.getItem("products"))
        : []
    }
  })

  const addToCart = useCallback(
    (product) => {
      if (typeof window !== "undefined" && window.localStorage) {
        const localStorageProducts = JSON.parse(
          localStorage.getItem("products")
        )

        // Create the array of products in localStorage (init an array of products on first add)
        if (!Array.isArray(localStorageProducts)) {
          const arrayProducts = []

          product.quantity = 1
          arrayProducts.push(product)
          localStorage.setItem("products", JSON.stringify(arrayProducts))
          setCart(arrayProducts)

          return
        }

        const productIndex = localStorageProducts.findIndex(
          (elt) => elt.id === product.id
        )

        // If product is not already in the cart, we add it
        if (productIndex === -1) {
          product.quantity = 1
          localStorage.setItem(
            "products",
            JSON.stringify([...localStorageProducts, product])
          )
          setCart([...cart, product])

          return
        }

        //Otherwise, we increment it's quantity
        localStorageProducts[productIndex].quantity++
        localStorage.setItem("products", JSON.stringify(localStorageProducts))
        setCart(localStorageProducts)
      }
    },
    [cart, setCart]
  )

  const deleteProductFromCart = useCallback(
    (product) => {
      const localStorageProducts = JSON.parse(localStorage.getItem("products"))

      const updatedLocalStorageProducts = localStorageProducts.filter(
        (elt) => elt.id !== product.id
      )
      localStorage.setItem("products", updatedLocalStorageProducts)
      setCart(updatedLocalStorageProducts)
    },
    [setCart]
  )

  const changeValuesProductFromCart = useCallback(
    (values) => {
      if (values.values === 0) {
        deleteProductFromCart(values.product)

        return
      }

      const localStorageProducts = JSON.parse(localStorage.getItem("products"))

      const productIndex = localStorageProducts.findIndex(
        (elt) => elt.id === values.product.id
      )

      localStorageProducts[productIndex].quantity = values.values
      localStorage.setItem("products", localStorageProducts)
      setCart(localStorageProducts)
    },
    [deleteProductFromCart, setCart]
  )

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    const { token } = parseCookies()

    if (!token) {
      return
    }

    const session = parseSession(token)

    setSession(session)
    setJWT(token)
  }, [])

  const contextValues = useMemo(() => {
    return {
      actions: {
        signOut,
        setCart,
        addToCart,
        changeValuesProductFromCart,
        deleteProductFromCart,
      },
      services,
      state: {
        session,
        cart,
      },
    }
  }, [
    signOut,
    addToCart,
    changeValuesProductFromCart,
    deleteProductFromCart,
    session,
    cart,
    services,
  ])

  // if (!isPublicPage && session === null) {
  //   return <span>Not connected</span>
  // }

  return <AppContext.Provider {...otherProps} value={contextValues} />
}

const useAppContext = () => {
  const { state, actions, services } = useContext(AppContext)

  return { state, actions, services }
}

export default useAppContext
