import { classnames } from "@/pages/_app";
import styles from "@/styles/components/Star.module.css";
import { StarIcon as StarIconOutlined } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

const Star = (props) => {
  const { checked } = props; 

  return (
    checked ? (
      <StarIconSolid
        className={classnames(
          styles.star,
          styles.checked
        )}
      />
    ): (
      <StarIconOutlined
        className={styles.star}
      />
    )
  );
};

export default Star; 