import Button from "@/web/components/Button";
import LoginField from "@/web/components/LoginField";
import routes from "@/web/routes";
import LoginLayout from "@/web/components/LoginLayout";
import { Form, Formik } from "formik";
import styles from "@/styles/register.module.css";
import { useCallback, useState } from "react";
import {
  createValidator,
  emailValidator,
  passwordValidator,
  phoneValidator,
  stringValidator
} from "@/validator";
import { useRouter } from "next/router";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import CollapseMenu from "@/web/components/CollapseMenu";
import useAppContext from "@/web/hooks/useAppContext";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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
  country: stringValidator
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
  country: ""
};

const Register = () => {
  const { t } = useTranslation(["register"]);
  const router = useRouter();
  const {
    services: {
      users: { register }
    }
  } = useAppContext();
  const [error, setError] = useState(null);

  const handleSubmit = useCallback(
    async (values) => {
      const [error] = await register(values);

      if (error) {
        if (error) {
          setError(error);

          return;
        }
      }

      router.push(routes.email.sent());
    },
    [router, register]
  );

  return (
    <main className={styles.container}>
      <Head>
        <title>{t("registerHeadTitle")}</title>
      </Head>

      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
        error={error}
      >
        {({ isValid, dirty, isSubmitting }) => (
          <Form className={styles.formContainer}>
            <p className={styles.formTitle}>{t("registerTitle")}</p>

            {error && (
              <p className={styles.error}>
                <ExclamationTriangleIcon className={styles.errorIcon} />
                {error}
              </p>
            )}
            <LoginField
              name="firstName"
              type="text"
              label={t("firstName")}
              showError={true}
              required={true}
            />

            <LoginField
              name="lastName"
              type="text"
              label={t("lastName")}
              showError={true}
              required={true}
            />

            <LoginField
              name="phoneNumber"
              type="text"
              label={t("phoneNumber")}
              showError={true}
              required={true}
            />

            <LoginField
              name="email"
              type="text"
              label={t("email")}
              showError={true}
              required={true}
            />

            <LoginField
              name="password"
              type="password"
              label={t("password")}
              showError={true}
              required={true}
            />

            <CollapseMenu title="Address" key={"address"}>
              <LoginField
                name="address"
                type="text"
                label={t("address")}
                showError={true}
              />

              <LoginField
                name="city"
                type="text"
                label={t("city")}
                showError={true}
              />

              <LoginField
                name="region"
                type="text"
                label={t("region")}
                showError={true}
              />

              <LoginField
                name="postalCode"
                type="text"
                label={t("postalCode")}
                showError={true}
              />

              <LoginField
                name="country"
                type="text"
                label={t("country")}
                showError={true}
              />
            </CollapseMenu>

            <p className={styles.requiredText}>
              {" "}
              <span className={styles.requiredStar}>*</span>{" "}
              {t("fieldRequired")}
            </p>

            <Button
              disabled={!(dirty && isValid) || isSubmitting}
              type={"submit"}
            >
              {t("registerButton")}
            </Button>
            <div className={styles.haveAccountText}>
              <p>
                Already have an account ?{" "}
                <span onClick={() => router.push(routes.login())}>
                  {" "}
                  Login here{" "}
                </span>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["register"]))
    }
  };
}
Register.getLayout = function (page) {
  return <LoginLayout>{page}</LoginLayout>;
};

export default Register;