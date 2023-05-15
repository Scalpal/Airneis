import { classnames } from "@/pages/_app";
import styles from "@/styles/components/CustomAlert.module.css";
import { CheckBadgeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";

const CustomAlert = (props) => {

  const { alert, showAlert } = props;

  let customStyle = "";

  switch (alert.status) {
    case "success": 
      customStyle = styles.success;
      break;
  
    case "error": 
      customStyle = styles.error;
      break;
    
    default:
      customStyle = styles.error;
      break;
  }
  
  return (
    <div className={classnames(
      styles.alert,
      customStyle,
      showAlert && styles.showError
    )}
    >
      {alert.status === "success" && <CheckBadgeIcon className={styles.icon} />}
      {alert.status === "error" && <ExclamationTriangleIcon className={styles.icon} />}
      <p>{alert.message}</p>
    </div>
  );
};

export default CustomAlert;