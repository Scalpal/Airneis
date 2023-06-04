import { createValidator, stringValidator, emailValidator } from "@/validator"
import { Formik, Form } from "formik"
import Button from "@/web/components/Button"
import styles from "@/styles/login.module.css"
import routes from "@/web/routes.js"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"
import useAppContext from "@/web/hooks/useAppContext"
import LoginLayout from "@/web/components/LoginLayout"
import LoginField from "@/web/components/LoginField"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"

const validationSchema = createValidator({
  email: emailValidator.required(),
  password: stringValidator.required(),
})

const initialValues = {
  email: "",
  password: "",
}

const Login = () => {
  const { t: translate } = useTranslation("login")
  const router = useRouter()
  const {
    services: { signIn },
  } = useAppContext()
  const [error, setError] = useState(null)

  const handleSubmit = useCallback(
    async (values) => {
      const [err] = await signIn(values)

      if (err) {
        setError(err)

        return
      }

      router.push(routes.pages.home())
    },
    [signIn, router]
  )

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
            <p className={styles.formTitle}>{translate("formTitle")}</p>

            {error && (
              <p className={styles.error}>
                <ExclamationTriangleIcon className={styles.errorIcon} />
                {error}
              </p>
            )}

            <LoginField
              name="email"
              type="text"
              label={translate("email")}
              showError={false}
            />

            <LoginField
              name="password"
              type="password"
              label={translate("password")}
              showError={false}
            />

            <Button disabled={!(dirty && isValid) || isSubmitting}>
              {translate("loginButton")}
            </Button>

            <div className={styles.moreTextCompartiment}>
              <p>
                {translate("forgotPassword")}
                <span onClick={() => router.push(routes.pages.resetPassword())}>
                  {translate("forgotPasswordLink")}
                </span>
              </p>
              <p>
                {translate("noAccount")}
                <span onClick={() => router.push(routes.pages.signUp())}>
                  {translate("noAccountLink")}
                </span>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  )
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["login"])),
    },
  }
}
Login.isPublic = true
Login.getLayout = function (page) {
  return <LoginLayout>{page}</LoginLayout>
}

export default Login
