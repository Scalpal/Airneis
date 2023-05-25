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
    actions: { mailResetPassword },
  } = useAppContext();
  const [error, setError] = useState(null);

  const handleSubmit = useCallback(
    async (values) => {
      const [err] = await mailResetPassword(values);

      if (err && error) {
        document
          .getElementById("errormsg")
          .animate([{ opacity: "100" }, { opacity: "0" }, { opacity: "100" }], {
            duration: 1000,
          });
      }

      if (err) {
        setError(err);

        return;
      }

      router.push(routes.paramsPage.mailSent(`id=${encodeURIComponent(id)}`));
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
            <p className={styles.formTitle}>{translate("forgotPassword")}</p>

            {error ? (
              <p id="errormsg" className={styles.error}>
                Email not found
              </p>
            ) : null}

            <LoginField
              name="email"
              type="text"
              label={translate("emailResetPassword")}
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
