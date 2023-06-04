import styles from "@/styles/components/Button.module.css"
import { classnames } from "@/pages/_app"
import { nunito } from "@/pages/_app"

const Button = (props) => {
  const { children, disabled, bgWhite, variant, ...otherProps } = props

  return (
    <button
      className={classnames(
        nunito.className,
        styles.button,
        bgWhite ? styles.bgWhite : "",
        variant === "outlined" ? styles.outlined : styles.contained,
        disabled ? styles.disabled : ""
      )}
      {...otherProps}
    >
      {children}
    </button>
  )
}

export default Button
