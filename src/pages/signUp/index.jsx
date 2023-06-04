import Button from "@/web/components/Button"
import LoginField from "@/web/components/LoginField"
import LoginLayout from "@/web/components/LoginLayout"
import { Form, Formik } from "formik"
import styles from "@/styles/register.module.css"
import { useCallback, useState } from "react"
import {
  createValidator,
  emailValidator,
  passwordValidator,
  phoneValidator,
  stringValidator,
} from "@/validator"
import { useRouter } from "next/router"
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid"
import CollapseMenu from "@/web/components/CollapseMenu"
import useAppContext from "@/web/hooks/useAppContext"
import routes from "@/web/routes"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"

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
})

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
}

const Register = () => {
  const { t: translate } = useTranslation("register")
  const router = useRouter()
  const {
    services: { signUp },
  } = useAppContext()
  const [error, setError] = useState(null)

  const handleSubmit = useCallback(
    async (values) => {
      const [error, id] = await signUp(values)

      if (error) {
        if (error) {
          setError(error)

          return
        }
      }

      router.push(routes.paramsPage.mailSent(`codedId=${id}`))
    },
    [router, signUp]
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
            <p className={styles.formTitle}>{translate("registerTitle")}</p>

            {error && (
              <p className={styles.error}>
                <ExclamationTriangleIcon className={styles.errorIcon} />
                {error}
              </p>
            )}

            <LoginField
              name="firstName"
              type="text"
              label={translate("firstName")}
              showError={true}
              required={true}
            />

            <LoginField
              name="lastName"
              type="text"
              label={translate("lastName")}
              showError={true}
              required={true}
            />

            <LoginField
              name="phoneNumber"
              type="text"
              label={translate("phoneNumber")}
              showError={true}
              required={true}
            />

            <LoginField
              name="email"
              type="text"
              label={translate("email")}
              showError={true}
              required={true}
            />

            <LoginField
              name="password"
              type="password"
              label={translate("password")}
              showError={true}
              required={true}
            />

            <CollapseMenu title="Address" key={"address"}>
              <LoginField
                name="address"
                type="text"
                label={translate("address")}
                showError={true}
              />

              <LoginField
                name="city"
                type="text"
                label={translate("city")}
                showError={true}
              />

              <LoginField
                name="region"
                type="text"
                label={translate("region")}
                showError={true}
              />

              <LoginField
                name="postalCode"
                type="text"
                label={translate("postalCode")}
                showError={true}
              />

              <LoginField
                name="country"
                type="text"
                label={translate("country")}
                showError={true}
              />
            </CollapseMenu>

            <p className={styles.requiredText}>
              <span className={styles.requiredStar}>*</span>
              {translate("fieldRequired")}
            </p>

            <Button
              disabled={!(dirty && isValid) || isSubmitting}
              type={"submit"}
            >
              {translate("registerButton")}
            </Button>

            <div className={styles.moreTextCompartiment}>
              <p>
                {translate("alreadyAccount")}
                <span onClick={() => router.push(routes.pages.signIn())}>
                  {translate("loginButton")}
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
      ...(await serverSideTranslations(locale, ["register"])),
    },
  }
}

Register.isPublic = true
Register.getLayout = function (page) {
  return <LoginLayout>{page}</LoginLayout>
}

export default Register
