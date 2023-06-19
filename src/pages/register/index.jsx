import Button from "@/web/components/Button";
import LoginField from "@/web/components/LoginField";
import LoginLayout from "@/web/components/LoginLayout";
import { Form, Formik } from "formik";
import styles from "@/styles/register.module.css";
import { useCallback, useState } from "react";
import { createValidator, emailValidator, passwordValidator, phoneValidator, stringValidator } from "@/validator";
import { useRouter } from "next/router";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import CollapseMenu from "@/web/components/CollapseMenu";
import useAppContext from "@/web/hooks/useAppContext";
import routes from "@/web/routes";

const validationSchema = createValidator({
  firstName: stringValidator
    .required("First name is a required field.")
    .min(2, "Your firstname should be 2 characters long at least"),
  lastName: stringValidator
    .required("Last name is a required field.")
    .min(2, "Your lastname should be 2 characters long at least"),
  phoneNumber: phoneValidator.required("The phone number is a required field."),
  email: emailValidator.required("The email is a required field."),
  password: passwordValidator.required("The password is  a required field."),
  address: stringValidator,
  city: stringValidator,
  region: stringValidator,
  postalCode: stringValidator,
  country: stringValidator, 
});

const initialValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  password: "",
  address: "",
  city: "",
  region: "",
  postalCode: "",
  country: "", 
}; 

const Register = () => {
  const router = useRouter();
  const { actions: { signUp } } = useAppContext();
  const [error, setError] = useState(null);

  const handleSubmit = useCallback(async (values) => {
    const [error] = await signUp(values); 

    if (error) {
      if (error[0].response.status === 409) {
        setError("E-mail already used.");

        return;
      } else {
        setError("Oops, something went wrong.");
 
        return;
      }

    router.push(routes.login()); 
  }, [router, signUp]); 

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
            
            {error &&
              <p className={styles.error}>
                <ExclamationTriangleIcon className={styles.errorIcon} />
                {error}
              </p>
            )}

            <LoginField
              name="firstName"
              type="text"
              label={translate("firstNameRegister")}
              showError={true}
              required={true}
            />

            <LoginField
              name="lastName"
              type="text"
              label={translate("lastNameRegister")}
              showError={true}
              required={true}
            />

            <LoginField
              name="phoneNumber"
              type="text"
              label={translate("phoneNumberRegister")}
              showError={true}
              required={true}
            />

            <LoginField
              name="email"
              type="text"
              label={translate("emailRegister")}
              showError={true}
              required={true}
            />

            <LoginField
              name="password"
              type="password"
              label={translate("passwordRegister")}
              showError={true}
              required={true}
            />

            <CollapseMenu
              title={translate("addressRegisterTitle")}
              key={"address"}
            >
              <LoginField
                name="address"
                type="text"
                label={translate("addressRegister")}
                showError={true}
              />

              <LoginField
                name="city"
                type="text"
                label={translate("cityRegister")}
                showError={true}
              />

              <LoginField
                name="region"
                type="text"
                label={translate("regionRegister")}
                showError={true}
              />

              <LoginField
                name="postalCode"
                type="text"
                label={translate("postalCodeRegister")}
                showError={true}
              />

              <LoginField
                name="country"
                type="text"
                label={translate("countryRegister")}
                showError={true}
              />
            </CollapseMenu>

            <p className={styles.requiredText}> <span className={styles.requiredStar}>*</span> : This field is required</p>

            <Button
              disabled={!(dirty && isValid) || isSubmitting}
              type={"submit"}
            >
              {translate("registerButton")}
            </Button>

            <div className={styles.haveAccountText}>
              <p>
                {translate("alreadyAccountText")}{" "}
                <span onClick={() => router.push(routes.login())}>
                  {" "}
                  {translate("alreadyAccountTLink")}{" "}
                </span>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  )
}


Register.getLayout = function (page) {
  return (
    <LoginLayout>
      {page}
    </LoginLayout>
  );
};
