import styles from "@/styles/components/SearchBar.module.css";
import { useEffect, useState } from "react";

const SearchBar = (props) => {
  const { searchStateAction } = props;
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleChange = (event) => {
    const { value } = event.target;

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      searchStateAction(value);
    }, 165);

    setTypingTimeout(timeout);
  };

  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  return (
    <>
      <input type="text" className={styles.searchBar} onChange={handleChange} />
    </>
  );
};

export default SearchBar;
