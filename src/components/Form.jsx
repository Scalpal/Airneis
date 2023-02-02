import { Formik, Form, Field } from "formik";
import styles from "@/styles/Form.module.css";

const form = (props) => {
  const { initialValues, schema } = props;
  const action = console.log("oui");

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={action}
      validationSchema={schema}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className={styles.form}>
          {Object.keys(initialValues).map((key, index) => (
            <Field key={index} name={key}>
              {({ field, meta }) => (
                <div>
                  <div className={styles.div}>
                    <input {...field} id={index} className={styles.input} />
                    <label htmlFor={index} className={styles.label}>
                      {key}
                    </label>
                  </div>
                  {meta.touched && meta.error ? (
                    <span className={styles.span}>{meta.error}</span>
                  ) : null}
                </div>
              )}
            </Field>
          ))}
          <div>
            <button
              className={styles.button}
              type="submit"
              disabled={isSubmitting || !isValid || !dirty}
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default form;
