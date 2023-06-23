import { PencilSquareIcon } from "@heroicons/react/24/outline";
import styles from "@/styles/backoffice/EditModal.module.css";
import { useState } from "react";
import { classnames } from "@/pages/_app";

const EditModal = () => {
  const [showEditModal, setShowEditModal] = useState(false); 

  return (
    <>
      <td onClick={() => setShowEditModal(!showEditModal)}>
        <PencilSquareIcon className={styles.icon} />
      </td>

      <div className={classnames(
        styles.overlay,
        showEditModal ? styles.overlayActive : styles.overlayInactive
      )}>
        <div
          className={styles.modal}
        >
          <button onClick={() => setShowEditModal(false)}> haha</button>
        </div>
      </div>

    </>
  );
};

export default EditModal;
