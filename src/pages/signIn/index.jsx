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

const validationSchema = createValidator({
  email: emailValidator.required(),
  password: stringValidator.required(),
})

const initialValues = {
  email: "",
  password: "",
}

const Login = () => {
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
            <p className={styles.formTitle}>Log into your account</p>

            {error && (
              <p className={styles.error}>
                <ExclamationTriangleIcon className={styles.errorIcon} />
                {error}
              </p>
            )}

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

            <Button disabled={!(dirty && isValid) || isSubmitting}>
              Login
            </Button>

            <div className={styles.moreTextCompartiment}>
              <p>
                Forgot your password ?{" "}
                <span onClick={() => router.push(routes.pages.resetPassword())}>
                  {" "}
                  Click here{" "}
                </span>
              </p>
              <p>
                Don&apos;t have an account ?{" "}
                <span onClick={() => router.push(routes.pages.signUp())}>
                  {" "}
                  Register here{" "}
                </span>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  )
}
Login.isPublic = true
Login.getLayout = function (page) {
  return <LoginLayout>{page}</LoginLayout>
}

export default Login
