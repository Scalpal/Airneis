import Button from "@/web/components/Button"
import LoginField from "@/web/components/LoginField"
import LoginLayout from "@/web/components/LoginLayout"
import { Form, Formik } from "formik"
import routes from "@/web/routes.js"
import styles from "@/styles/login.module.css"
import { useRouter } from "next/router"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback, useEffect, useState } from "react"
import {
  createValidator,
  passwordValidator,
  confirmPasswordValidator,
} from "@/validator"
const merge = require("deepmerge")

const validationSchema = createValidator({
  password: passwordValidator.required(),
  passwordConfirmation: confirmPasswordValidator.required(),
})

const initialValues = {
  password: "",
  passwordConfirmation: "",
}

const MailResetPassword = () => {
  const router = useRouter()
  const { id, timer } = router.query
  const {
    actions: { resetPassword, crypt },
  } = useAppContext()
  const [errorURL, setErrorURL] = useState(null)
  const [error, setError] = useState(null)
  const [cryptoId, setCryptoId] = useState(null)
  const [cryptoTimer, setCryptoTimer] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (id && timer) {
        const [{ getId }, { getTimer }] = await crypt([{ id }, { timer }])

        if (!getId || !getTimer) {
          setErrorURL(true)
          setError("Invalid page")

          return
        }

        setCryptoId(getTimer)
        setCryptoTimer(getId)
      }
    }

    fetchData()
  }, [crypt, id, timer])

  const handleSubmit = useCallback(
    async (values) => {
      if (errorURL) {
        setError(errorURL)

        return
      }

      const newValues = merge(values, {
        id: cryptoId,
        timer: cryptoTimer,
      })
      const [err] = await resetPassword(newValues)

      if (err) {
        setError(err)

        return
      }

      router.push(routes.login())
    },
    [cryptoId, cryptoTimer, errorURL, resetPassword, router]
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
            <p className={styles.formTitle}>Reset your password</p>

            {error ? <p className={styles.error}>{error}</p> : null}

            <LoginField
              name="password"
              type="password"
              label="New Password"
              showError={false}
            />

            <LoginField
              name="passwordConfirmation"
              type="password"
              label="Confirm New Password"
              showError={false}
            />

            <Button disabled={!(dirty && isValid) || isSubmitting}>
              Reset Password
            </Button>

            <div className={styles.noAccountText}>
              <p>
                Don&apos;t want to reset your password ?{" "}
                <span onClick={() => router.push(routes.home())}>
                  {" "}
                  Return home{" "}
                </span>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  )
}

MailResetPassword.isPublic = true
MailResetPassword.getLayout = function (page) {
  return <LoginLayout>{page}</LoginLayout>
}

export default MailResetPassword
