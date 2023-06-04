import Layout from "@/web/components/backoffice/Layout";
import { AxiosError } from "axios";
import { parseCookies } from "nookies";
import routes from "@/web/routes";
import { useCallback, useState } from "react";
import styles from "@/styles/backoffice/userPage.module.css";
import { classnames, nunito } from "@/pages/_app";
import { CheckIcon } from "@heroicons/react/24/outline";
import LoginField from "@/web/components/LoginField";
import { Field, Form, Formik } from "formik";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Button from "@/web/components/Button";
import AddressCard from "@/web/components/AddressCard";
import { boolValidator, createValidator, phoneValidator } from "@/validator";
import { stringValidator } from "@/validator";
import { emailValidator } from "@/validator";
import useAppContext from "@/web/hooks/useAppContext";
import CustomAlert from "@/web/components/CustomAlert";
import checkToken from "@/web/services/checkToken";
import getApiClient from "@/web/services/getApiClient";
import checkIsAdmin from "@/web/services/checkIsAdmin";

const validationSchema = createValidator({
  firstName: stringValidator.required(),
  lastName: stringValidator.required(),
  email: emailValidator.required(),
  phoneNumber: phoneValidator.required(),
  active: boolValidator.required(),
  isAdmin: boolValidator.required(),
});

const BackofficeUserPage = (props) => {
  const { user } = props;
  const {
    actions: { api },
  } = useAppContext();

  const [currentUser, setCurrentUser] = useState(user);
  const [editMode, setEditMode] = useState({ type: "", editing: false });
  const [alert, setAlert] = useState({ status: "", message: "" });
  const [showAlert, setShowAlert] = useState(false);

  const handleEditMode = useCallback(
    (type, handleReset) => {
      setEditMode({
        type: editMode.type !== type ? type : "",
        editing: !editMode.editing,
      });

      if (editMode.type === type) {
        handleReset();
      }
    },
    [editMode]
  );

  const handleSubmit = useCallback(
    async (values) => {
      try {
        const { data } = await api.patch(
          routes.api.users.patch(user.id),
          values
        );

        setEditMode({ type: "", editing: false });
        setCurrentUser(data.user);
        setShowAlert(true);
        setAlert({ status: data.status, message: data.message });
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.response);
        }
      }
    },
    [api, user.id]
  );

  return (
    <main className={classnames(styles.mainContainer, nunito.className)}>
      <p className={styles.title}>
        User {currentUser.id} : {currentUser.lastName} {currentUser.firstName}
      </p>

      <div className={styles.contentWrapper}>
        <Formik
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          enableReinitialize={true}
          initialValues={currentUser}
        >
          {({ values, isValid, dirty, isSubmitting, handleReset }) => {
            return (
              <Form className={styles.contentLeft}>
                <div className={styles.contentTitleWrapper}>
                  <p className={styles.contentTitle}>Informations</p>

                  <PencilSquareIcon
                    className={styles.titleIcon}
                    onClick={() => handleEditMode("informations", handleReset)}
                  />
                </div>

                <LoginField
                  name="firstName"
                  type="text"
                  label="First name"
                  showError={false}
                  disabled={
                    editMode.editing === true &&
                    editMode.type === "informations"
                      ? !editMode.editing
                      : true
                  }
                />

                <LoginField
                  name="lastName"
                  type="text"
                  label="Last name"
                  showError={false}
                  disabled={
                    editMode.editing === true &&
                    editMode.type === "informations"
                      ? !editMode.editing
                      : true
                  }
                />

                <LoginField
                  name="email"
                  type="text"
                  label="E-mail"
                  showError={false}
                  disabled={
                    editMode.editing === true &&
                    editMode.type === "informations"
                      ? !editMode.editing
                      : true
                  }
                />

                <LoginField
                  name="phoneNumber"
                  type="text"
                  label="Phone number"
                  showError={false}
                  disabled={
                    editMode.editing === true &&
                    editMode.type === "informations"
                      ? !editMode.editing
                      : true
                  }
                />

                <div className={styles.checkboxItem}>
                  <p>Active </p>
                  <Field
                    type="checkbox"
                    name="active"
                    id="active"
                    disabled={
                      editMode.editing === true &&
                      editMode.type === "informations"
                        ? !editMode.editing
                        : true
                    }
                  />
                  <label
                    htmlFor="active"
                    className={classnames(
                      values.active ? styles.checked : "",
                      editMode.editing !== true &&
                        editMode.type !== "informations"
                        ? styles.checkboxDisabled
                        : ""
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
                    disabled={
                      editMode.editing === true &&
                      editMode.type === "informations"
                        ? !editMode.editing
                        : true
                    }
                  />
                  <label
                    htmlFor="isAdmin"
                    className={classnames(
                      values.isAdmin ? styles.checked : "",
                      editMode.editing !== true &&
                        editMode.type !== "informations"
                        ? styles.checkboxDisabled
                        : ""
                    )}
                  >
                    {values.isAdmin && <CheckIcon className={styles.icon} />}
                  </label>
                </div>

                {editMode.type === "informations" && editMode.editing && (
                  <Button
                    type={"submit"}
                    disabled={!(dirty && isValid) || isSubmitting}
                  >
                    Save
                  </Button>
                )}
              </Form>
            );
          }}
        </Formik>

        <div className={styles.contentRight}>
          <div className={styles.contentTitleWrapper}>
            <p>Address</p>
          </div>

          <div className={styles.addressContainer}>
            {Array.isArray(user.address) ? (
              user.address.map((address, index) => {
                return (
                  <AddressCard
                    address={address}
                    key={index}
                    index={index + 1}
                  />
                );
              })
            ) : (
              <AddressCard address={user.address} index={1} />
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
  );
};

export const getServerSideProps = async (context) => {
  const id = context.params.userId;
  const { token } = parseCookies(context);
  const badTokenRedirect = await checkToken(token);

  if (badTokenRedirect) {
    return badTokenRedirect;
  }

  const notAdminRedirect = await checkIsAdmin(context);

  if (notAdminRedirect) {
    return notAdminRedirect;
  }

  const reqInstance = getApiClient(context);

  try {
    const result = await reqInstance.get(
      `http://localhost:3000/${routes.api.users.single(id)}`
    );

    if (!result.data.user) {
      return {
        redirect: {
          destination: "/backoffice/users",
          permanent: false,
        },
      };
    }

    return {
      props: {
        user: result.data.user,
      },
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response);
    }
  }
};

BackofficeUserPage.isPublic = false;
BackofficeUserPage.getLayout = function (page) {
  return <Layout>{page}</Layout>;
};

export default BackofficeUserPage;
