import { ArrowUpIcon } from "@heroicons/react/24/solid";
import styles from "@/styles/components/BackToTopButton.module.css"; 

const BackToTopButton = (props) => {
  const { onPress } = props;

  return (
    <button
      className={styles.button}
      onClick={() => onPress()}
    >  
      <ArrowUpIcon className={styles.icon} />
      <p>Back to top</p>
    </button>
  );
};

export default BackToTopButton; 