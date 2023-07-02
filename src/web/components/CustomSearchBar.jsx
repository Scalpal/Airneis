import { classnames } from "@/pages/_app";
import styles from "@/styles/components/CustomSearchBar.module.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";

const CustomSearchBar = (props) => {
  const {
    id,
    placeholder,
    onPressEnter,
    onPressSearch,
    onPressDelete,
    additionnalClasses,
    size,
    ...otherProps
  } = props;

  const sizeStyle = () => {
    switch (size) {
      case "small": return styles.small;

      case "medium": return styles.medium;

      case "large": return styles.large;

      case "fit-to-parent": return styles.fitToParent;

      default: return styles.small;
    }
  };

  useEffect(() => {
    const searchInput = document.getElementById(id);

    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        onPressEnter(searchInput.value);
      }
    };
    searchInput.addEventListener("keydown", handleKeyDown);

    return () => {
      searchInput.removeEventListener("keydown", handleKeyDown);
    };
  }, [id, onPressEnter]);

  return (
    <div className={classnames(
      styles.wrapper,
      additionnalClasses,
      sizeStyle()
    )}>
      <button
        className={styles.button}
        onClick={onPressSearch}
      >
        <MagnifyingGlassIcon className={styles.icons} />
      </button>
      
      <input
        id={id}
        type="text"
        className={styles.input}
        placeholder={placeholder}
        {...otherProps}
      />

      <button
        className={styles.button}
        onClick={onPressDelete}>
        <XMarkIcon className={styles.icons} />
      </button>
    </div>     
  );
};

export default CustomSearchBar;