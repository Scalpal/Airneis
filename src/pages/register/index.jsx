import Button from "@/web/components/Button";
import LoginField from "@/web/components/LoginField";
import LoginLayout from "@/web/components/LoginLayout";
import { Form, Formik } from "formik";
import styles from "@/styles/login.module.css";
// import { useRouter } from "next/router";
// import useAppContext from "@/web/hooks/useAppContext";
import { useState } from "react";
import { createValidator, emailValidator, phoneValidator, stringValidator } from "@/validator";

const validationSchema = createValidator({
  firstName: stringValidator.required().min(2, "Your firstname should be 2 characters long at least"),
  lastName: stringValidator.required().min(2, "Your lastname should be 2 characters long at least"),
  phone: phoneValidator.required(),  
  email: emailValidator.required(),
  password: stringValidator.required(),
});

const initialValues = {
  firstName: "",
  lastName: "", 
  phone: "",
  email: "",
  password: "",
}; 


const Register = () => {

  // const router = useRouter();
  // const { actions: { signIn } } = useAppContext();
  const [error, _] = useState(null);


  return (
    <main className={styles.container}>
      <Formik
        // onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
        error={error}
      >
        {({ isValid, dirty, isSubmitting }) => (
          <Form className={styles.formContainer}>
            <p className={styles.formTitle}>Register</p>
            
            {error ? <p id="errormsg" className={styles.error}>password or login incorrect</p> : null}
            <LoginField
              name="firstName"
              type="text"
              label="First name"
              showError={false}
            />

            <LoginField
              name="lastName"
              type="text"
              label="Last name"
              showError={false}
            />
            
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
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </main>
  );
};

Register.isPublic = true;
Register.getLayout = function (page) {
  return (
    <LoginLayout>
      {page}
    </LoginLayout>
  );
};

export default Register;