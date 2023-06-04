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
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
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
  const { t: translate } = useTranslation("resetPasswordMail")
  const router = useRouter()
  const { codedId, codedTimer } = router.query
  const id = decodeURIComponent(codedId)
  const timer = decodeURIComponent(codedTimer)
  const [errorURL, setErrorURL] = useState(null)
  const [error, setError] = useState(null)
  const [cryptoId, setCryptoId] = useState(null)
  const [cryptoTimer, setCryptoTimer] = useState(null)
  const {
    services: {
      resetPassword,
      security: { crypt },
    },
  } = useAppContext()

  useEffect(() => {
    const fetchData = async () => {
      if (codedId && codedTimer) {
        const [{ getId }, { getTimer }] = await crypt([{ id }, { timer }])

        if (!getId && !getTimer) {
          setErrorURL(true)
          setError("Invalid page")

          return
        }

        setCryptoId(getTimer)
        setCryptoTimer(getId)
      }
    }

    fetchData()
  }, [codedId, codedTimer, crypt, id, timer])

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

      router.push(routes.pages.signIn())
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
            <p className={styles.formTitle}>
              {translate("resetPasswordTitle")}
            </p>

            {error ? <p className={styles.error}>{error}</p> : null}

            <LoginField
              name="password"
              type="password"
              label={translate("newPassword")}
              showError={false}
            />

            <LoginField
              name="passwordConfirmation"
              type="password"
              label={translate("confirmPassword")}
              showError={false}
            />

            <Button disabled={!(dirty && isValid) || isSubmitting}>
              {translate("resetPasswordButton")}
            </Button>

            <div className={styles.moreTextCompartiment}>
              <p>
                {translate("noResetPassword")}
                <span onClick={() => router.push(routes.pages.home())}>
                  {translate("returnHomeLink")}
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
      ...(await serverSideTranslations(locale, ["resetPasswordMail"])),
    },
  }
}

MailResetPassword.isPublic = true
MailResetPassword.getLayout = function (page) {
  return <LoginLayout>{page}</LoginLayout>
}

export default MailResetPassword
