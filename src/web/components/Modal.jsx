import { classnames } from "@/pages/_app";
import styles from "@/styles/components/Modal.module.css";
import { useEffect } from "react";

const Modal = (props) => {
  const { showModal, children } = props;

  useEffect(() => {
    if (showModal === true) {
      document.body.style.overflow = "hidden";

      return;
    }

    document.body.style.overflow = ""; 
  }, [showModal]);

  return (
    <div className={classnames(
      styles.overlay,
      showModal ? styles.overlayActive : styles.overlayInactive
    )}>
      <div
        className={styles.modal}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal; 