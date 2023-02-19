import styles from "@/styles/Button.module.css"; 
import { Montserrat } from "@next/font/google";
import { classnames } from "@/pages/_app";

const montserrat = Montserrat({
  variable: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const Button = (props) => {

  const { title, action, disabled } = props; 

  return (
    <button
      className={classnames(styles.button, montserrat.className)}
      onClick={action}
      disabled={disabled}
    >
      <span className={styles.buttonText}>{title}</span>
    </button>
  );
};

export default Button; 