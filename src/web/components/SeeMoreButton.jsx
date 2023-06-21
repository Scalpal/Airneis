import styles from "@/styles/components/SeeMoreButton.module.css"; 
import { useRouter } from "next/router";

const SeeMoreButton = (props) => {
  const { children, route } = props;
  const router = useRouter();

  return (
    <button
      className={styles.button}
      onClick={() => router.push(route)}
    >
      {children}
    </button>
  );
};

export default SeeMoreButton;