import styles from "@/styles/components/IndexPages.module.css";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import routes from "@/web/routes";
import { useEffect,useState } from "react";
import { classnames } from "@/pages/_app";
import { useRouter } from "next/router";

const IndexPages = (props) => {
  const { count,page } = props;
  const [lastPage,setLastPage] = useState(0);
  const [pagination,setPagination] = useState([]);
  const router = useRouter();

  const getPageNumbers = (lastPage, currentPage) => {
    const postArray =  currentPage - 2 > 1
      ? [1, "dot", currentPage - 1]
      : [currentPage - 2,currentPage - 1];  
  
    const afterArray = currentPage + 2 < lastPage
      ? [currentPage + 1, "dot", lastPage]
      : [currentPage + 1, currentPage + 2];
  
    return [...postArray, currentPage, ...afterArray].filter(
      (states) => states === "dot" || (states >= 1 && states <= lastPage)
    );
  };

  useEffect(() => {
    setLastPage(count % 20 === 0 ? count / 20 : (count / 20) + 1);
    const array = getPageNumbers(lastPage,page);
    setPagination(array);

    if (Number.parseInt(page) > lastPage && lastPage !== 0) {
      router.push(routes.params.products(`page=${lastPage}`)); 
    }
    if (Number.parseInt(page) < 1) {
      router.push(routes.params.products("page=1")); 
    }
  },[count,lastPage,page,router,setLastPage]);
  
  const handlePageChange = (event) => {
    router.push(routes.params.products(event.target.value)); 
  };

  const handlePreviousPage = () => {
    router.push(routes.params.products(`page=${page - 1}`)); 
  };
  const handleNextPage = () => {
    router.push(routes.params.products(`page=${page + 1}`)); 
  };

  return (
    <div className={styles.content}>
      <div className={styles.pagination}>
        <div className={styles.arrow}>
          {page === 1 ? (
            <div className={styles.disabled}>
              <ChevronLeftIcon />
              <span>Précédent</span>
            </div>
          ) : (
            <Link href={routes.params.products(`page=${page - 1}`)}>
              <ChevronLeftIcon />
              <span>Précédent</span>
            </Link>
          )}
        </div>

        {pagination.map((pageNumber, index) => (
          <span key={index}>
            {pageNumber === "dot" ? (
              <EllipsisHorizontalIcon className={styles.dot} />
            ) : (
              <Link href={routes.params.products(`page=${pageNumber}`)} className={classnames(styles.items, {[styles.current]: pageNumber === page})}>
                <span>{pageNumber}</span>
              </Link>
            )}
          </span>
        ))}

        <div className={styles.arrow}>
          {page === lastPage ? (
            <div className={styles.disabled}>
              <span>Suivant</span>
              <ChevronRightIcon />
            </div>
          ) : (
            <Link href={routes.params.products(`page=${page + 1}`)}>
              <span>Suivant</span>
              <ChevronRightIcon />
            </Link>
          )}
        </div>
        {/* mobile */}
      </div>
      <div className={styles.mobilePagination}>
        <button className={styles.mobileButton}  onClick={handlePreviousPage}>
          <ChevronLeftIcon />
        </button>
        <select value={`page=${page}`} className={styles.mobileSelect} onChange={handlePageChange}>
          {Array.from({ length: lastPage }, (_, i) => (
            <option key={i} value={`page=${i + 1}`}>
        page {i + 1}
            </option>
          ))}
        </select>
        <button className={styles.mobileButton} onClick={handleNextPage}>
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
};

export default IndexPages;
