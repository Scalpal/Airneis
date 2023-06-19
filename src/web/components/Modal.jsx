import { classnames } from "@/pages/_app"
import styles from "@/styles/components/Modal.module.css"
import { useEffect } from "react"

const Modal = (props) => {
  const { showModal, setShowModal, children } = props

  useEffect(() => {
    if (showModal === true) {
      document.body.style.overflow = "hidden"

      return
    }

    document.body.style.overflow = "" 
  }, [showModal])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowModal(false) 
      }
    }
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [setShowModal])

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
  )
}

export default Modal 