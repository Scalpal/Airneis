import styles from "@/styles/components/ReviewList.module.css";
import useGetProductReviews from "../hooks/useGetProductReviews";
import formatDate from "../services/formatDate";
import Stars from "./Stars";
import Loader from "./Loader";
import routes from "../routes";

const ReviewList = (props) => {
  const { productSlug, limit, page } = props; 
  
  const { productReviewsData, productReviewsError, productReviewsLoading } = useGetProductReviews(routes.api.products.reviews(productSlug, limit, page));
  const reviews = (!productReviewsLoading && !productReviewsError) ? productReviewsData.reviews : [];
  
  return (
    <div className={styles.reviewWrapper}>
      {!productReviewsLoading ? (
        typeof reviews !== "undefined" && reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div
              key={index}
              className={styles.review}
            >
              <div className={styles.topBlock}>
                <div className={styles.starsTitleWrapper}>
                  <Stars rating={review.rating} />

                  <p className={styles.title}> {review.title} </p>
                </div>

                <p className={styles.userInfo}>
                  By {review.user.firstName} {review.user.lastName}, {formatDate(review.createdAt)}
                </p>
              </div>

              <p className={styles.content}>{review.content}</p>
            </div>
          ))
        ): (
          <p className={styles.noReviewsText}>This product has not been reviewed yet.</p> 
        )
      ): (
        <Loader />
      )}
    </div>
  );
};

export default ReviewList;