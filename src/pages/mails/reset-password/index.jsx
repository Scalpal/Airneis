import Button from "@/web/components/Button";
import LoginField from "@/web/components/LoginField";
import LoginLayout from "@/web/components/LoginLayout";
import { Form,Formik } from "formik";
import routes from "@/web/routes.js";
import styles from "@/styles/login.module.css";
import { useRouter } from "next/router";
import useAppContext from "@/web/hooks/useAppContext";
import { useCallback,useState } from "react";
import { createValidator,passwordValidator,confirmPasswordValidator } from "@/validator";
const merge = require("deepmerge");

const validationSchema = createValidator({
  password: passwordValidator.required(),
  passwordConfirmation: confirmPasswordValidator.required(),
});

const initialValues = {
  password: "",
  passwordConfirmation: "",
};


const MailResetPassword = () => {

  const router = useRouter();
  const { actions: { passwordReset,crypt } } = useAppContext();
  const [error,setError] = useState(null);

  const handleSubmit = useCallback(
    async (values) => {
      const cryptoId = decodeURIComponent(router.query.id);
      const cryptoTimer = decodeURIComponent(router.query.timer);

      const [{ getCryptoId },{ getCryptoTimer }] = await crypt([{ cryptoId },{ cryptoTimer }]);

      const newValues = merge(values,{ id: getCryptoId,timer: getCryptoTimer });
      const [err] = await passwordReset(newValues);

      if (err && error) {
        document.getElementById("errormsg").animate(
          [
            { opacity: "100" },
            { opacity: "0" },
            { opacity: "100" },
          ],
          {
            duration: 1000,
          }
        );
      }

      if (err) {
        setError(err);

        return;
      }
      router.push(routes.login());
    },
    [router,crypt,passwordReset,error]
  );

  return (
    <main className={styles.container}>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
        error={error}
      >
        {({ isValid,dirty,isSubmitting }) => (
          <Form className={styles.formContainer}>
            <p className={styles.formTitle}>Reset your password</p>

            {error ? <p id="errormsg" className={styles.error}>Error, please try later</p> : null}

            <LoginField
              name="password"
              type="password"
              label="New Password"
              showError={false}
            />

            <LoginField
              name="passwordConfirmation"
              type="password"
              label="Confirm New Password"
              showError={false}
            />

            <Button
              disabled={!(dirty && isValid) || isSubmitting}
            >
              Reset Password
            </Button>

            <div className={styles.noAccountText}>
              <p>Don&apos;t want to reset your password ? <span onClick={() => router.push(routes.home())}> Return home </span></p>
            </div>

          </Form>
        )}
      </Formik>
    </main>
  );
};

MailResetPassword.isPublic = true;
MailResetPassword.getLayout = function (page) {
  return (
    <LoginLayout>
      {page}
    </LoginLayout>
  );
};

export default MailResetPassword;