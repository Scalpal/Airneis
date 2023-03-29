import createAPIClient from "@/web/createAPIClient.js"
import parseSession from "@/web/parseSession.js"
// import signInService from "@/web/services/signIn.js"
import signUpService from "@/web/services/signUp.js"
import {
  createContext,
  // useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

const AppContext = createContext()

export const AppContextProvider = (props) => {
  const { isPublicPage, ...otherProps } = props
  const [session, setSession] = useState(null)
  const [jwt, setJWT] = useState(null)
  const api = createAPIClient({ jwt })

  // NFS: we inject all the deps to our actions here but declare them
  // in different files to not overburden the context declaration.
  const signUp = signUpService({ api })
  // const signIn = signInService({ api, setSession, setJWT })
  // const signOut = useCallback(() => {
  //   localStorage.removeItem(config.session.localStorageKey)
  //   setSession(false)
  // }, [])

  useEffect(() => {
    const jwt = localStorage.getItem("session config")

    if (!jwt) {
      return
    }

    const session = parseSession(jwt)

    setSession(session)
    setJWT({ jwt })
  }, [])

  if (!isPublicPage && session === null) {
    return (
      <>
        <span>No Connected</span>
      </>
    )
  }

  return (
    <AppContext.Provider
      {...otherProps}
      value={{
        actions: {
          signUp,
          // signIn,
          // signOut,
        },
        state: {
          session,
        },
      }}
    />
  )
}

const useAppContext = () => useContext(AppContext)

export default useAppContext
