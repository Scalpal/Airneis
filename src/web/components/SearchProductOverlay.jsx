import { useCallback, useEffect, useState } from "react"
import styles from "@/styles/components/SearchProductOverlay.module.css"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import ProductSearchBar from "./ProductSearchBar"
import { XMarkIcon } from "@heroicons/react/24/solid"



const SearchProductOverlay = () => {
  const [isOpened, setIsOpened] = useState(false)

  const closeOverlay = useCallback(() => {
    setIsOpened(false)
  }, [setIsOpened])

  useEffect(() => {
    if (isOpened === true) {
      document.body.style.overflow = "hidden"

      return
    }

    document.body.style.overflow = "" 
  }, [isOpened])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpened(false) 
      }
    }
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [setIsOpened])


  return (
    <>
      <button
        className={styles.button}
        onClick={() => setIsOpened(true)}
      >
        <MagnifyingGlassIcon className={styles.icon} />
      </button>

      {isOpened === true && (
        <div
          className={styles.overlay}
        >
          <button
            className={styles.closeBtn}
            onClick={() => setIsOpened(false)}
          >
            <XMarkIcon className={styles.closeBtnIcon} />
          </button>

          <div className={styles.contentWrapper}>
            <p className={styles.title}>What are you looking for ?</p>

            <ProductSearchBar
              id={"searchInput"}
              placeholder={"Red chair made with oak wood"}
              showSuggestions={true}
              closeOverlay={closeOverlay}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default SearchProductOverlay