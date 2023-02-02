import styles from "@/styles/CustomerReview.module.css";

const CustomerReview = (props) => {
  const { review } = props;

  return (
    <div className={styles.customerReview}>
      <div className={styles.customerReviewPicture}></div>

      <div className={styles.customerReviewText}>
        <p>{`"${review.review}"`}</p>

        <p>
          <strong>{review.customerName}</strong>
        </p>
      </div>
    </div>
  );
};

export default CustomerReview;
