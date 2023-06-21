import { useState } from "react"
import styles from "@/styles/components/CollapseMenu.module.css"
import { classnames } from "@/pages/_app"
import { ChevronDownIcon } from "@heroicons/react/24/solid"

const CollapseMenu = (props) => {
  const { children, title, defaultCollapsed ,size } = props; 

  const [isMenuCollapsed, setIsMenuCollapsed] = useState(defaultCollapsed ? defaultCollapsed : false); 

  const sizeStyle = () => {
    switch (size) {
      case "large": return styles.large;

      case "medium": return styles.medium;

      case "small": return styles.small;

      case "fit-to-parent": return styles.fitToParent;

      default: return styles.small;
    }
  };
  
  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}
        type={"button"}
      >
        <p>{title}</p>
        <ChevronDownIcon
          className={classnames(
            styles.buttonIcon,
            isMenuCollapsed ? styles.iconCollapsed : ""
          )}
        />
      </button>

      <div
        className={classnames(
          styles.menu,
          isMenuCollapsed ? styles.collapsed : styles.close,
          sizeStyle()
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default CollapseMenu
