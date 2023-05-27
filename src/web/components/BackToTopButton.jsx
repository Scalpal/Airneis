import { ArrowUpIcon } from "@heroicons/react/24/solid";
import styles from "@/styles/components/BackToTopButton.module.css"; 

const BackToTopButton = (props) => {
  const { anchor } = props;

  return (
    <a
      className={styles.button}
      href={`#${anchor}`}
    >  
      <ArrowUpIcon className={styles.icon} />
    </a>
  );
};

export default BackToTopButton; 