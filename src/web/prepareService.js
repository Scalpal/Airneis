import signUpService from "@/web/services/users/signUp.js";
import signInService from "@/web/services/users/signIn.js";
import mailResetPasswordService from "@/web/services/mails/mailResetPassword.js";
import confirmAccountService from "@/web/services/mails/confirmAccount.js";
import productsViewerService from "@/web/services/products/productsViewer.js";
import materialsViewerService from "@/web/services/materials/materialsViewer.js";
import categoriesViewerService from "@/web/services/categories/categoriesViewer.js";
import resetPasswordService from "@/web/services/users/resetPassword.js";
import cryptService from "@/web/services/crypt.js";
// import loggedUserService from "@/web/services/loggedUser.js"

const prepareService = ({ api, setSession, setJWT, session }) => {
  return {
    signUp: signUpService({ api }),
    signIn: signInService({ api, setSession, setJWT }),
    getProducts: productsViewerService({ api }),
    getMaterials: materialsViewerService({ api }),
    getCategories: categoriesViewerService({ api }),
    resetPassword: resetPasswordService({ api }),
    // loggedUser: loggedUserService({ api }),
    sendMail: {
      resetPassword: mailResetPasswordService({ api }),
      confirmAccount: confirmAccountService({ api }),
    },
    security: {
      crypt: cryptService({ api }),
    },
  };
};

export default prepareService;
