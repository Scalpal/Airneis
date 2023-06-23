import styles from "@/styles/backoffice/LoginLayout.module.css";
import { classnames } from "@/pages/_app";
import { nunito } from "@/pages/_app";

const BackofficeLoginLayout = ({children}) => {
  return (
    <div className={classnames(styles.layout, nunito.className)}>
      {children}
    </div>
  );
};

export default BackofficeLoginLayout;
