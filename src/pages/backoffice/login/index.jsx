import { createValidator, stringValidator, emailValidator } from "@/validator";
import BackofficeLoginLayout from "@/web/components/backoffice/LoginLayout";
import { Formik, Form } from "formik";
import CustomField from "@/web/components/backoffice/CustomField";
import Button from "@/web/components/Button";
import styles from "@/styles/backoffice/loginPage.module.css";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import useAppContext from "@/web/hooks/useAppContext";

const validationSchema = createValidator({
  email: emailValidator.required(),
  password: stringValidator.required(),
})

const initialValues = {
  email: "",
  password: "",
}

const login = () => {
  const router = useRouter()
  const {
    actions: { signUp },
  } = useAppContext()
  const [error, setError] = useState(null)
  const handleSubmit = useCallback(
    async (values) => {
      const [firstName, lastname] = values.name.split(" ");

      const newValues = {
        email: values.email,
        firstName,
        lastname,
        password: values.password
      };

      const [err] = await signUp(newValues)

      if (err) {
        setError(err)

        return
      }

      router.push("/sign-in")
    },
    [signUp, router]
  )
  return (
    <main className={styles.mainContent}>

      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
        error={error}
      >
        {({ isValid, dirty }) => (
          <Form className={styles.formContainer}>
            <div className={styles.titlesBlock}>
              <p className={styles.logo}>Airneis</p>
              <p> - </p>
              <p>Backoffice</p>
            </div>

            <CustomField
              name="email"
              type="text"
              label="E-mail"
              showError={false}
            />

            <CustomField
              name="password"
              type="text"
              label="Password"
              showError={false}
            />

            <div className={styles.buttonWrapper}>
              <Button
                disabled={!(dirty && isValid)}
              >
                Login
              </Button>
            </div>

          </Form>
        )}
      </Formik>

    </main>
  );
}
login.isPublic = true
login.getLayout = function (page) {
  return (
    <BackofficeLoginLayout>
      {page}
    </BackofficeLoginLayout>
  );
};

export default login; 