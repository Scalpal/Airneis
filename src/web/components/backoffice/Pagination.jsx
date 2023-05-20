import { useCallback, useEffect, useState } from "react";
import styles from "@/styles/backoffice/Pagination.module.css";
import { classnames } from "@/pages/_app";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const Pagination = (props) => {
  const { dataCount, queryParams, handleQueryParams } = props; 

  const [totalPages, setTotalPages] = useState([[]]);
  const [activeChunk, setActiveChunk] = useState(0); 

  useEffect(() => {
    const pages = []; 
    const chunkSize = 5; // We want to see pages 5 by 5, but we can change it to see pages X by X
    const pagesCount = Math.ceil(dataCount / queryParams.limit);

    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i); 
    }

    // Chunked pages 5 by 5 
    const chunkedPages = pages.reduce((acc, curr, i) => {
      const chunkIndex = Math.floor(i / chunkSize);

      if (!acc[chunkIndex]) {
        acc[chunkIndex] = [];
      }

      acc[chunkIndex].push(curr);
      return acc;
    }, []);

    setTotalPages(chunkedPages);
  }, [dataCount, queryParams]);

  // Handle pagination
  const firstPage = useCallback(() => {
    handleQueryParams("page", 1);
  }, [handleQueryParams]);

  const lastPage = useCallback(() => {
    handleQueryParams("page", Math.ceil(dataCount / queryParams.limit));
  }, [handleQueryParams, dataCount, queryParams.limit]);

  const nextPage = useCallback(() => {
    if (queryParams.page !== Math.ceil(dataCount / queryParams.limit)) {
      handleQueryParams("page", queryParams.page + 1);
    }
  }, [handleQueryParams, dataCount, queryParams.limit, queryParams.page]);

  const previousPage = useCallback(() => {
    if (queryParams.page !== 1) {
      handleQueryParams("page", queryParams.page - 1);
    }
  }, [handleQueryParams, queryParams.page]); 

  const findActiveChunk = useCallback(() => {
    totalPages.map((chunk, index) => {
      if (chunk.includes(queryParams.page)) {
        setActiveChunk(index);

        return;
      }
    });
  }, [totalPages, queryParams.page]);

  useEffect(() => {
    findActiveChunk();
  }, [findActiveChunk, activeChunk]);

  return (
    <div className={styles.container}>

      <div className={styles.chevronWrapper}>
        <button
          className={styles.chevronButton}
          disabled={queryParams.page === 1 ? true : false}
          onClick={() => firstPage()}
        >
          <ChevronDoubleLeftIcon className={styles.icon} />
        </button>
        <button
          className={styles.chevronButton}
          disabled={queryParams.page === 1 ? true : false}
          onClick={() => previousPage()}
        >
          <ChevronLeftIcon className={styles.icon} />
        </button>
      </div>

      <div>
        {totalPages[activeChunk].map((value, index) => (
          <button
            key={index}
            className={classnames(
              styles.button, 
              queryParams.page === value ? styles.activeButton : ""
            )}
            onClick={() => handleQueryParams("page", value)}
          >
            {value}
          </button>
        ))}
      </div>

      <div className={styles.chevronWrapper}>
        <button
          className={styles.chevronButton}
          disabled={queryParams.page === Math.ceil(dataCount / queryParams.limit) ? true : false}          
          onClick={() => nextPage()}
        >
          <ChevronRightIcon className={styles.icon} />
        </button>
        <button
          className={styles.chevronButton}
          disabled={queryParams.page === Math.ceil(dataCount / queryParams.limit) ? true : false}          
          onClick={() => lastPage()}
        >
          <ChevronDoubleRightIcon className={styles.icon} />
        </button>
      </div>
      
      <p className={styles.bottomText}>Page {queryParams.page} of {Math.ceil(dataCount / queryParams.limit)}</p>
    </div>
  );
};

export default Pagination;