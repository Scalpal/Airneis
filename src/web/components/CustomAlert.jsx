import { classnames } from "@/pages/_app";
import styles from "@/styles/components/CustomAlert.module.css";
import { CheckBadgeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";

const CustomAlert = (props) => {
  const { alert, showAlert, setShowAlert } = props;

  let customStyle = "";

  switch (alert.status) {
    case "success":
      customStyle = styles.success;

      break;
    
    case "warning":
      customStyle = styles.warning;

      break;

    case "error":
      customStyle = styles.error;

      break;

    default:
      customStyle = styles.success;

      break;
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowAlert(false);
    }, 3500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [showAlert, setShowAlert]);
  
  return (
    <div className={classnames(
      styles.alert,
      customStyle,
      showAlert && styles.showError
    )}
    >
      {alert.status === "success" && <CheckBadgeIcon className={styles.icon} />}
      {alert.status === "warning" && <ExclamationTriangleIcon className={styles.icon} />}
      {alert.status === "error" && <ExclamationTriangleIcon className={styles.icon} />}
      <p>{alert.message}</p>
    </div>
  );
};

export default CustomAlert;