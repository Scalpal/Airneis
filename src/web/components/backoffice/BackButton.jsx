import styles from "@/styles/backoffice/BackButton.module.css"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"

const BackButton = (props) => {
  const { setShowModal } = props 
 
  return (
    <div className={styles.backButtonWrapper}>
      <button
        className={styles.backButton}
        onClick={() => setShowModal(false)}
      >
        <ArrowLeftIcon className={styles.buttonIcon} /> Back
      </button>
      <span className={styles.line}></span>
    </div>
  )
}

export default BackButton