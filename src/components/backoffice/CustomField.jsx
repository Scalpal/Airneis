import { Field } from "formik";
import styles from "@/styles/backoffice/CustomField.module.css"; 
import classnames from "classnames";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const CustomField = (props) => {

  const { name, label, showError, ...otherProps } = props;

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <Field name={name}>
      {({ field, meta }) => {

        return (
          <label
            name={label}
            className={styles.fieldWrapper}
          >
            <input
              {...field}
              {...otherProps}
              type={name === "password" ? passwordVisibility ? "text" : name : name}
              className={classnames(
                styles.input,
              )}
            />

            <span
              className={classnames(
                styles.label,
                field.value.length > 0 ? styles.labelActive : null
              )}
            >
              {label}
            </span>

            {/* Show eye icon only for input type PASSWORD */}
            {name === "password" ?
              passwordVisibility ? 
                <EyeSlashIcon
                  className={classnames(
                    styles.inputIcon,
                    styles.eyeIcon
                  )}
                  onClick={() => setPasswordVisibility(false)}
                /> 
                : 
                <EyeIcon
                  className={classnames(
                    styles.inputIcon,
                    styles.eyeIcon
                  )}
                  onClick={() => setPasswordVisibility(true)}
                />
              :
              null
            }
            {/*  */}
            
            {/* Show error if we want to */}
            {showError && meta.touched && meta.error ? (
              <span className={styles.errorText}>
                {meta.error}
              </span>
            )
              : null
            }
          </label>
        );
      }}
    </Field>
  );
};

export default CustomField;