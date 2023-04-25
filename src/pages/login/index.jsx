import { createValidator, stringValidator, emailValidator } from "@/validator";
import { Formik, Form } from "formik";
import Button from "@/web/components/Button";
import styles from "@/styles/login.module.css";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import useAppContext from "@/web/hooks/useAppContext";
import LoginLayout from "@/web/components/LoginLayout";
import LoginField from "@/web/components/LoginField";
import Link from "next/link";
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
  const { actions: { signIn } } = useAppContext();
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
    <main className={styles.container}>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
        error={error}
      >
        {({ isValid, dirty, isSubmitting }) => (
          <Form className={styles.formContainer}>
            <p className={styles.formTitle}>Log into your account</p>
            
            {error ? <p id="errormsg" className={styles.error}>password or login incorrect</p> : null}
            <LoginField
              name="email"
              type="text"
              label="E-mail"
              showError={false}
            />

            <LoginField
              name="password"
              type="password"
              label="Password"
              showError={false}
            />

            <Button
              disabled={!(dirty && isValid) || isSubmitting}
            >
              Login
            </Button>

            <div className={styles.noAccountText}>
              <p>Don&apos;t have an account ? </p> 
              <Link href="/register"> Register here</Link>
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
    <LoginLayout>
      {page}
    </LoginLayout>
  );
};

export default Login; 