import { createValidator, stringValidator, emailValidator } from "@/validator";
import { Formik, Form } from "formik";
import Button from "@/web/components/Button";
import styles from "@/styles/login.module.css";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import useAppContext from "@/web/hooks/useAppContext";
import LoginLayout from "@/web/components/LoginLayout";
import LoginField from "@/web/components/LoginField";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const validationSchema = createValidator({
  email: emailValidator.required(),
  password: stringValidator.required(),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const { t } = useTranslation("login");
  const router = useRouter();
  const { actions: { signIn } } = useAppContext();
  const [error, setError] = useState(null);

  const handleSubmit = useCallback(async (values) => {
    const [err] = await signIn(values);

    if (err) {
      setError(err[0].response.data.error);

      return;
    }

    router.push("/");
  },[signIn, router]);

  return (
    <main className={styles.container}>
      <Head>
        <title>Airneis - Login</title>
      </Head>  

      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
        error={error}
      >
        {({ isValid, dirty, isSubmitting }) => (
          <Form className={styles.formContainer}>
            <p className={styles.formTitle}>{t("formTitle")}</p>

            {error && (
              <p className={styles.error}>
                <ExclamationTriangleIcon className={styles.errorIcon} />
                {error}
              </p>
            )}

            <LoginField
              name="email"
              type="text"
              label={t("email")}
              showError={false}
            />

            <LoginField
              name="password"
              type="password"
              label={t("password")}
              showError={false}
            />

            <Button disabled={!(dirty && isValid) || isSubmitting}>
              {t("loginButton")}
            </Button>

            <div className={styles.noAccountText}>
              <p>
                {t("forgotPassword")}
                <span>{t("forgotPasswordLink")}</span>
              </p>
              <p>
                {t("noAccount")}
                <span onClick={() => router.push("/register")}>
                  {" "}
                  {t("noAccountLink")}
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
      ...(await serverSideTranslations(locale, ["login"])),
    },
  };
}

Login.getLayout = function (page) {
  return <LoginLayout>{page}</LoginLayout>;
};


export default Login; 