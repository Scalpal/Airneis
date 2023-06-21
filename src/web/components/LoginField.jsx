import { Field } from "formik"
import styles from "@/styles/components/LoginField.module.css"
import classnames from "classnames"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

const LoginField = (props) => {
  const { name, type, label, required, showError, disabled, ...otherProps } = props;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <Field name={name}>
      {({ field, meta }) => {
        return (
          <div name={label} className={styles.wrapper}>
            <label
              name={label}
              className={classnames(
                styles.label,
                disabled ? styles.labelDisabled : "",
                meta.error ? styles.labelError : ""
              )}
              htmlFor={label}
            >
              {label}
              {required ? <span className={styles.requiredStar}> *</span> : ""}
            </label>

            <input
              {...field}
              {...otherProps}
              type={
                type === "password"
                  ? isPasswordVisible
                    ? "text"
                    : "password"
                  : "text"
              }
              id={label}
              disabled={disabled}
              className={classnames(
                styles.input,
                meta.error ? styles.inputError : "",
                name === "password" ? styles.inputPassword : null
              )}
            />

            {type === "password" && (
              isPasswordVisible ? (
                <EyeSlashIcon
                  className={styles.inputIcon}
                  onClick={() => setIsPasswordVisible(false)}
                />
              ) : (
                <EyeIcon
                  className={styles.inputIcon}
                  onClick={() => setIsPasswordVisible(true)}
                />
              ))}

            {showError && meta.touched && meta.error ? (
              <span className={styles.errorText}>{meta.error}</span>
            ) : null}
          </div>
        )
      }}
    </Field>
  )
}

export default LoginField
