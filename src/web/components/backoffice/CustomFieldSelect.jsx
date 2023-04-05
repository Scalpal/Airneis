import { Field } from "formik";
import styles from "@/styles/backoffice/CustomField.module.css";

const CustomField = (props) => {

  const { name, label, options, showError, ...otherProps } = props;

  return (
    <Field name={name}>
      {({ field, meta }) => {

        return (
          <div
            name={label}
            className={styles.div}
          >
            <select
              className={styles.select}
              {...field}
              {...otherProps}
              id={label}>
              <option value="" selected hidden></option>
              {options.map((states, index) => (
                <option key={index} value={states}>{states}</option>
              ))}

            </select>

            <label
              name={label}
              className={styles.label}
              htmlFor={label}
            >{label}</label>

            {showError && meta.touched && meta.error ? (
              <span className={styles.errorText}>
                {meta.error}
              </span>
            )
              : null
            }
          </div>
        );
      }}
    </Field>
  );
};

export default CustomField;