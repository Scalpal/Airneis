import Star from "./Star";
import styles from "@/styles/components/ProductRating.module.css"; 

const ProductRating = (props) => {
  const { rating, totalReviews } = props; 

  const arrayRating = new Array(5).fill("").map((_, i) => i + 1); 

  return (
    <div className={styles.container}>
      {arrayRating.map((_, index) => (
        <Star
          checked={(index <= rating && rating !== null) ? true : false}
          key={index}
        />
      ))}

      <p className={styles.reviewAmountText}>
        ({totalReviews < 100 ? totalReviews : "99+"})
      </p>
    </div>
  );
};

export default ProductRating;