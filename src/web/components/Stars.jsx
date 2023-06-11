import Star from "./Star";
import styles from "@/styles/components/Stars.module.css";

const Stars = (props) => {
  const { rating } = props;

  const arrayRating = new Array(5).fill("").map((_, i) => i + 1);

  return (
    <div className={styles.wrapper}>
      {arrayRating.map((rate, index) => (
        <Star
          checked={(rate <= rating && rating !== null) ? true : false}
          key={index}
        />
      ))}
    </div>
  );
};

export default Stars;