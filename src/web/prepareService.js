// user services
import signUpService from "@/web/services/users/signUp";
import signInService from "@/web/services/users/signIn";
import resetPasswordService from "@/web/services/users/resetPassword";
import confirmAccountService from "@/web/services/users/confirmAccount";

// send mails services
import sendResetPasswordServices from "@/web/services/mails/mailResetPassword";

// security services
import cryptService from "@/web/services/security/crypt";

// backoffice services
import checkTokenService from "@/web/services/backoffice/checkToken";
import checkIsAdminService from "@/web/services/backoffice/checkIsAdmin";

// eslint-disable-next-line no-unused-vars
const prepareService = ({ api, setSession, setJWT }) => {
  return {
    users: {
      register: signUpService({ api }),
      login: signInService({ api, setSession, setJWT }),
      resetPassword: resetPasswordService({ api }),
      confirmAccount: confirmAccountService({ api }),
    },
    mails: {
      resetPassword: sendResetPasswordServices({ api }),
    },
    security: {
      crypt: cryptService({ api }),
    },
    backOffice: {
      checkToken: checkTokenService(),
      checkIsAdmin: checkIsAdminService(),
    },
  };
};

export default prepareService;
