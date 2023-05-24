import signUpService from "@/web/services/signUp.js"
import test from "@/web/services/test.js"

const prepareService = ({ api, setSession, setJWT, session }) => {
  return {
    test: test({ api }),
  }
}

export default prepareService
