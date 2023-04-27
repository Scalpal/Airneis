import { Field } from "formik";
import styles from "@/styles/components/LoginField.module.css";
import classnames from "classnames";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const LoginField = (props) => {

  const { name, type, label, showError, ...otherProps } = props;

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const typeIs = () => {
    if (type === "password") {
      return passwordVisibility ? "text" : "password";
    }

    return type;
  };

  const passwordIcon = () => {
    if (passwordVisibility) {
      return (
        <EyeSlashIcon
          className={
            styles.inputIcon
          }
          onClick={() => setPasswordVisibility(false)}
        />
      );
    }
    return (<EyeIcon
      className={
        styles.inputIcon
      }
      onClick={() => setPasswordVisibility(true)}
    />);
  };

  return (
    <Field name={name}>
      {({ field, meta }) => {
        return (
          <div
            name={label}
            className={styles.wrapper}
          >
            <label
              name={label}
              className={styles.label}
              htmlFor={label}
            >
              {label}
            </label>

            <input
              {...field}
              {...otherProps}
              type={typeIs()}
              id={label}
              className={classnames(
                styles.input,
                name === "password" ? styles.inputPassword : null
              )}
            />

            {name === "password" ?
              passwordIcon()
              :
              null
            }

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

export default LoginField;