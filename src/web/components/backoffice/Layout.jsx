import Navbar from "@/web/components/backoffice/Navbar";
import styles from "@/styles/backoffice/Layout.module.css";

const BackofficeLayout = ({ children }) => {

  return (
    <div className={styles.layout} >
      <Navbar />

      <div className={styles.childrenContainer}>
        {children}
      </div>
    </div>
  );
};

export default BackofficeLayout; 
