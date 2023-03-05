import BackofficeLoginLayout from "@/components/backoffice/LoginLayout";
import { Formik, Form } from "formik";
import * as yup from "yup";
import YupPassword from "yup-password";
import CustomField from "@/components/backoffice/CustomField";
import Button from "@/components/Button";
import styles from "@/styles/backoffice/loginPage.module.css"; 

YupPassword(yup); 

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Wrong e-mail format ")
    .required("This field cannot be empty"),
  password: yup
    .string()
    .required("This field cannot be empty")
});

const BackofficeLogin = () => {


  return (
    <main className={styles.mainContent}>

      <Formik
        validationSchema={validationSchema}
        initialValues={{
          email: "", 
          password: ""
        }}
      >
        {({isValid, dirty, values}) => (
          <Form className={styles.formContainer}>
            <div className={styles.titlesBlock}>
              <p className={styles.logo}>Airneis</p>
              <p> - </p>
              <p>Backoffice</p>
            </div>

            <CustomField
              name="email"
              label="E-mail"
              showError={false}
            />

            <CustomField
              name="password"
              label="Password"
              showError={false}
            />

            <div className={styles.buttonWrapper}>
              <Button
                disabled={!(dirty && isValid)}
                // onClick={() => { console.log("heheheheh"); }}
              >
                Login
              </Button>
            </div>

          </Form>
        )}
      </Formik>

    </main>
  );
};

BackofficeLogin.getLayout = function(page) {
  return (
    <BackofficeLoginLayout>
      {page}
    </BackofficeLoginLayout>
  );
};

export default BackofficeLogin; 