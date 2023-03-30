import { createValidator, displayNameValidator, phoneValidator, emailValidator, passwordValidator } from "@/validator";
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
  password: passwordValidator.required(),
  phone: phoneValidator.required(),
  name: displayNameValidator.required()
});

const initialValues = {
  email: "",
  password: "",
  name: "",
  phone: "",
};

const SignUp = () => {
  const router = useRouter();
  const {
    actions: { signUp },
  } = useAppContext();
  const [error, setError] = useState(null);
  const handleSubmit = useCallback(
    async (values) => {
      const [firstName, lastName] = values.name.split(" ");

      const newValues = {
        email: values.email,
        firstName,
        lastName,
        password: values.password,
        phoneNumber: values.phone
      };

      const [err] = await signUp(newValues);

      if (err) {
        setError(err);

        return;
      }

      router.push("/login");
    },
    [signUp, router]
  );
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
              type="password"
              label="Password"
              showError={false}
            />

            <CustomField
              name="name"
              type="text"
              label="First and last name"
              showError={false}
            />

            <CustomField
              name="phone"
              type="tel"
              label="Mobile number"
              showError={false}
            />

            <div className={styles.buttonWrapper}>
              <Button
                disabled={!(dirty && isValid)}
              >
                Sign-up
              </Button>
            </div>

          </Form>
        )}
      </Formik>

    </main>
  );
};
SignUp.isPublic = true;
SignUp.getLayout = function (page) {
  return (
    <BackofficeLoginLayout>
      {page}
    </BackofficeLoginLayout>
  );
};

export default SignUp; 