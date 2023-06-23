import styles from "@/styles/components/ProductRating.module.css"; 
import Stars from "./Stars";

const ProductRating = (props) => {
  const { rating, totalReviews } = props; 

  return (
    <div className={styles.container}>
      <Stars rating={rating} />

      <p className={styles.reviewAmountText}>
        ({totalReviews < 100 ? totalReviews : "99+"})
      </p>
    </div>
  );
};

export default ProductRating;