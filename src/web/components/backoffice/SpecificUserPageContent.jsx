import { classnames, nunito } from "@/pages/_app"
import styles from "@/styles/backoffice/SpecificUserPageContent.module.css" 
import { CheckIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import { Field, Form, Formik } from "formik"
import { useCallback, useState } from "react"
import LoginField from "../LoginField"
import { splitCamelCase } from "@/web/services/SplitCamelCase"
import Button from "../Button"
import AddressCard from "../AddressCard"
import BackButton from "./BackButton"
import { boolValidator, createValidator, emailValidator, phoneValidator, stringValidator } from "@/validator"
import routes from "@/web/routes"
import useAppContext from "@/web/hooks/useAppContext"
import { AxiosError } from "axios"
import CustomAlert from "../CustomAlert"

const validationSchema = createValidator({
  firstName: stringValidator.required(),
  lastName: stringValidator.required(),
  email: emailValidator.required(),
  phoneNumber: phoneValidator.required(),
  active: boolValidator.required(),
  isAdmin: boolValidator.required()
})

const mappableKeys = ["email", "firstName", "lastName", "phoneNumber"]

const SpecificUserPageContent = (props) => {
  const { user, setShowModal, updateUsers } = props
  const { actions: { api } } = useAppContext() 

  const [currentUser, setCurrentUser] = useState(user) 
  const [editMode, setEditMode] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alert, setAlert] = useState("")

  const initialValues = {
    email: currentUser.email,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    phoneNumber: currentUser.phoneNumber,
    active: currentUser.active,
    isAdmin: currentUser.isAdmin
  }

  const handleSubmit = useCallback(async(values) => {
    try {
      const { data } = await api.patch(routes.api.users.patch(user.id), values)

      setCurrentUser(data.user)
      setShowAlert(true)
      setAlert({ status: data.status, message: data.message })
      updateUsers()
    } catch (error) {
      setShowAlert(true)

      if (error instanceof AxiosError) {
        setAlert({ status: error.response.status, message: error.response.message })
      }

      setAlert({ status: "error", message: "An error occured during the update." })
    } finally {
      setEditMode(false)
    }
  }, [api, updateUsers, user.id])

  return (
    <main
      className={classnames(
        styles.mainContainer,
        nunito.className
      )}
    >
      <BackButton setShowModal={setShowModal}/>

      <p className={styles.title}>User {currentUser.id} : {currentUser.lastName} {currentUser.firstName}</p>

      <div className={styles.contentWrapper}>
        <Formik
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          enableReinitialize={true}
          initialValues={initialValues}
        >
          {({ values, isValid, dirty, isSubmitting }) => {
            return (
              <Form className={styles.contentLeft}>
                <div className={styles.contentTitleWrapper}>
                  <p className={styles.contentTitle}>Informations</p>

                  <PencilSquareIcon
                    className={styles.titleIcon}
                    onClick={() => setEditMode((state) => !state)}
                  />
                </div>

                {Object.entries(currentUser).map(([key, value], index) => {
                  return (
                    mappableKeys.includes(key) && (
                      <LoginField
                        key={index}
                        name={key}
                        type="text"
                        defaultValue={value}
                        label={splitCamelCase(key)}
                        showError={true}
                        disabled={!editMode}
                      />
                    )
                  )
                })}

                <div className={styles.checkboxItem}>
                  <p>Active </p>
                  <Field
                    type="checkbox"
                    name="active"
                    id="active"
                    disabled={!editMode}
                  />
                  <label
                    htmlFor="active"
                    className={classnames(
                      values.active ? styles.checked : "",
                      !editMode ? styles.checkboxDisabled : ""
                    )}
                  >
                    {values.active && <CheckIcon className={styles.icon} />}
                  </label>
                </div>

                <div className={styles.checkboxItem}>
                  <p>Admin </p>
                  <Field
                    type="checkbox"
                    name="isAdmin"
                    id="isAdmin"
                    disabled={!editMode}
                  />
                  <label
                    htmlFor="isAdmin"
                    className={classnames(
                      values.isAdmin ? styles.checked : "",
                      (editMode.editing !== true && editMode.type !== "informations") ? styles.checkboxDisabled : ""
                    )}
                  >
                    {values.isAdmin && <CheckIcon className={styles.icon} />}
                  </label>
                </div>  
              
                {editMode && (
                  <Button
                    type={"submit"}
                    disabled={!(dirty && isValid) || isSubmitting}
                  >
                    Save
                  </Button>
                )}
              </Form>
            )
          }}
        </Formik>

        <div className={styles.contentRight}>
          <div className={styles.contentTitleWrapper}>
            <p>Address</p>
          </div>

          <div className={styles.addressContainer}>
            {user.address.length > 0 ? (
              user.address.map((address, index) => {
                return (
                  <AddressCard address={address} key={index} index={index + 1} />
                )
              })
            ): (
              <p>You currently have added no address</p>
            )}
          </div>

        </div>
      </div>

      <CustomAlert
        alert={alert}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
    </main>
  )
}

export default SpecificUserPageContent