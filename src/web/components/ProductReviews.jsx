import styles from "@/styles/components/ProductReviews.module.css";
import Pagination from "./backoffice/Pagination";
import { useCallback } from "react";
import useGetProductReviews from "../hooks/useGetProductReviews";
import routes from "../routes";
import ReviewList from "./ReviewList";
import { useRouter } from "next/router";

const ProductReviews = (props) => {
  const { productId, setPage, page, limit } = props;
  const router = useRouter(); 

  const {
    productReviewsData,
    productReviewsLoading
  } = useGetProductReviews(routes.api.products.reviews(productId, limit, page));

  // Handle pagination
  const setToPage = useCallback((value) => {
    setPage(value);

    router.push(router.pathname, `#productReviewAnchor`, { scroll: false });
  }, [setPage, router]);

  const firstPage = useCallback(() => {
    setPage(1);

    router.push(router.pathname, `#productReviewAnchor`, { scroll: false });
  }, [setPage, router]);

  const lastPage = useCallback(() => {
    if (productReviewsLoading) { return; }

    setPage(Math.ceil(productReviewsData.count / limit));

    router.push(router.pathname, `#productReviewAnchor`, { scroll: false });
  }, [productReviewsLoading, productReviewsData, limit, setPage, router]);

  const nextPage = useCallback(() => {
    if (productReviewsLoading) { return; }
  
    if (page !== Math.ceil(productReviewsData.count / limit)) {
      setPage(page + 1);
    }

    router.push(router.pathname, `#productReviewAnchor`, { scroll: false });
  }, [page, limit, productReviewsLoading, productReviewsData, setPage, router]);

  const previousPage = useCallback(() => {
    if (page !== 1) {
      setPage(page - 1);
    }

    router.push(router.pathname, `#productReviewAnchor`, { scroll: false });
  }, [page, setPage, router]); 

  return (
    <section id="productReview" className={styles.container}>
      
      <div className={styles.titleWrapper}>
        <div className={styles.line}></div>
        <p className={styles.title}>Reviews</p>
        <div className={styles.line}></div>
      </div>

      <ReviewList
        key={page}
        productId={productId}
        page={page}
        limit={limit}
      />

      <div className={styles.prefetchedList}>
        <ReviewList
          productId={productId}
          page={page + 1}
          limit={limit}
        />
      </div>

      {(!productReviewsLoading && productReviewsData.reviews.length > 0) && (
        <Pagination
          dataCount={productReviewsData.count}
          page={page}
          limit={limit}
          setPage={setToPage}
          nextPage={nextPage}
          previousPage={previousPage}
          firstPage={firstPage}
          lastPage={lastPage}
        />
      )}

    </section>
  );
};

export default ProductReviews;