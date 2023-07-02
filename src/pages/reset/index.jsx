import Button from "@/web/components/Button";
import LoginField from "@/web/components/LoginField";
import LoginLayout from "@/web/components/LoginLayout";
import { Form, Formik } from "formik";
import routes from "@/web/routes.js";
import styles from "@/styles/login.module.css";
import { useRouter } from "next/router";
import useAppContext from "@/web/hooks/useAppContext";
import { useCallback, useState } from "react";
import { createValidator, emailValidator } from "@/validator";

const validationSchema = createValidator({
  email: emailValidator.required(),
});

const initialValues = {
  email: "",
};

const ResetPassword = () => {
  const router = useRouter();

  const {
    services: {
      mails: { resetPassword },
    },
  } = useAppContext();
  const [error, setError] = useState(null);

  const handleSubmit = useCallback(
    async (values) => {
      const [err] = await resetPassword(values);

      if (err) {
        setError(err);

        return;
      }

      router.push(router.push(routes.email.sent()));
    },
    [resetPassword, router]
  );

  return (
    <main className={styles.container}>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
        error={error}
      >
        {({ isValid, dirty, isSubmitting }) => (
          <Form className={styles.formContainer}>
            <p className={styles.formTitle}>Forgot Password ?</p>

            {error ? (
              <p id="errormsg" className={styles.error}>
                {error}
              </p>
            ) : null}

            <LoginField
              name="email"
              type="text"
              label="E-mail"
              showError={false}
            />

            <Button disabled={!(dirty && isValid) || isSubmitting}>
              Reset Password
            </Button>

            <div className={styles.noAccountText}>
              <p>
                Already have an account ?{" "}
                <span onClick={() => router.push(routes.login())}>
                  {" "}
                  Sign here{" "}
                </span>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
};

ResetPassword.isPublic = true;
ResetPassword.getLayout = function (page) {
  return <LoginLayout>{page}</LoginLayout>;
};

export default ResetPassword;
