import styles from "@/styles/components/Button.module.css"; 
import { classnames } from "@/pages/_app";
import { nunito } from "@/pages/_app";

const Button = (props) => {

  const { children, disabled, ...otherProps } = props; 

  return (
    <button
      className={
        classnames(
          disabled ? styles.buttonDisabled : styles.button,
          nunito.className,
        )}
      {...otherProps}
    >
      <span className={styles.buttonText}>{children}</span>
    </button>
  );
};

export default Button; 