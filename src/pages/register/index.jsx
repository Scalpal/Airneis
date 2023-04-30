import Button from "@/web/components/Button";
import LoginField from "@/web/components/LoginField";
import LoginLayout from "@/web/components/LoginLayout";
import { Form, Formik } from "formik";
import styles from "@/styles/register.module.css";
import { useCallback, useState } from "react";
import { createValidator, emailValidator, phoneValidator, stringValidator } from "@/validator";
import Axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { classnames } from "../_app";
import CollapseMenu from "@/web/components/CollapseMenu";
import routes from "@/web/routes";

const validationSchema = createValidator({
  firstName: stringValidator.required().min(2, "Your firstname should be 2 characters long at least"),
  lastName: stringValidator.required().min(2, "Your lastname should be 2 characters long at least"),
  phoneNumber: phoneValidator.required(),  
  email: emailValidator.required(),
  password: stringValidator.required(),
});

const initialValues = {
  firstName: "",
  lastName: "", 
  phoneNumber: "",
  email: "",
  password: "",
}; 

const Register = () => {

  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = useCallback(async (values) => {
    const url = `http://localhost:3000/${routes.api.register}`; 

    try {
      const result = await Axios.post(url, values); 
      console.log("result : ", result); 

      router.push("/login");

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error); 
        const { response } = error; 

        if (response.status === 409) {
          setError("E-mail already used.");
        } else {
          setError("Oops, something went wrong."); 
        }
      }
    }
  }, [router]); 

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
            <p className={styles.formTitle}>Register</p>
            
            <p
              className={classnames(
                styles.error,
                styles.errorNotVisible
              )}
            >
              {/* {error} */}
              <ExclamationTriangleIcon className={styles.errorIcon} />
              E-mail already used 
            </p>

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
              name="phoneNumber"
              type="text"
              label="Phone number"
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

            <CollapseMenu title="Address" key={"materials"}>
              <LoginField
                name="lastName"
                type="text"
                label="Last name"
                showError={false}
              />
            </CollapseMenu>

            <Button
              disabled={!(dirty && isValid) || isSubmitting}
              type={"submit"}
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