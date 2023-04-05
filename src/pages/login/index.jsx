import { createValidator, stringValidator, emailValidator } from "@/validator";
import BackofficeLoginLayout from "@/web/components/backoffice/LoginLayout";
import { Formik, Form } from "formik";
import CustomField from "@/web/components/backoffice/CustomField";
import Button from "@/web/components/Button";
import styles from "@/styles/backoffice/loginPage.module.css";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import useAppContext from "@/web/hooks/useAppContext";
const merge = require("deepmerge");

const validationSchema = createValidator({
  email: emailValidator.required(),
  password: stringValidator.required(),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const router = useRouter();
  const {
    actions: { signIn },
  } = useAppContext();
  const [error, setError] = useState(null);
  const handleSubmit = useCallback(
    async (values) => {
      const newValues = merge(values, { access: "utilisateur" });
      const [err] = await signIn(newValues);

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
      router.push("/home");
    },
    [signIn, error, router]
  );
  return (
    <main className={styles.mainContent}>

      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
        error={error}
      >
        {({ isValid, dirty, isSubmitting }) => (
          <Form className={styles.formContainer}>
            <div className={styles.titlesBlock}>
              <p className={styles.logo}>Airneis</p>
            </div>
            {error ? <p id="errormsg" className={styles.error}>password or login incorrect</p> : null}
            <CustomField
              name="email"
              type="text"
              label="E-mail"
              showError={false}
            />

            <CustomField
              name="password"
              type="password"
              label="Password"
              showError={false}
            />

            <div className={styles.buttonWrapper}>
              <Button
                disabled={!(dirty && isValid) || isSubmitting}
              >
                Login
              </Button>
            </div>

          </Form>
        )}
      </Formik>

    </main>
  );
};
Login.isPublic = true;
Login.getLayout = function (page) {
  return (
    <BackofficeLoginLayout>
      {page}
    </BackofficeLoginLayout>
  );
};

export default Login; 