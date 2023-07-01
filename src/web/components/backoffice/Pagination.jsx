import { useCallback, useEffect, useState } from "react";
import styles from "@/styles/backoffice/Pagination.module.css";
import { classnames } from "@/pages/_app";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const Pagination = (props) => {
  const { dataCount, page, limit, setPage, nextPage, previousPage, firstPage, lastPage } = props; 

  const [totalPages, setTotalPages] = useState([[]]);
  const [activeChunk, setActiveChunk] = useState(0); 
  const [pagesArray, setPagesArray] = useState([]);

  const findActiveChunk = useCallback(() => {
    totalPages.map((chunk, index) => {
      if (chunk.includes(page)) {
        setActiveChunk(index);

        return;
      }
    });
  }, [totalPages, page]); 

  const handleSelect = useCallback((e) => {
    const value = Number.parseInt(e.target.value);

    setPage(value);
  }, [setPage]);

  useEffect(() => {
    const pages = []; 
    const chunkSize = 5; // We want to see pages 5 by 5, but we can change it to see pages X by X
    const pagesCount = Math.ceil(dataCount / limit);

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
    setPagesArray(new Array(pagesCount).fill("").map((_, i) => i + 1));
  }, [dataCount, limit]);

  useEffect(() => {
    findActiveChunk();
  }, [findActiveChunk, activeChunk]);

  return (
    <div className={styles.container}>

      <div className={styles.chevronWrapper}>
        <button
          className={styles.chevronButton}
          disabled={page === 1 ? true : false}
          onClick={() => firstPage()}
        >
          <ChevronDoubleLeftIcon className={styles.icon} />
        </button>
        <button
          className={styles.chevronButton}
          disabled={page === 1 ? true : false}
          onClick={() => previousPage()}
        >
          <ChevronLeftIcon className={styles.icon} />
        </button>
      </div>

      <div className={styles.buttonWrapper}>
        {totalPages[activeChunk].map((value, index) => (
          <button
            key={index}
            className={classnames(
              styles.button, 
              page === value ? styles.activeButton : ""
            )}
            onClick={() => setPage(value)}
          >
            {value}
          </button>
        ))}
      </div>

      <div className={styles.chevronWrapper}>
        <button
          className={styles.chevronButton}
          disabled={page === Math.ceil(dataCount / limit) ? true : false}          
          onClick={() => nextPage()}
        >
          <ChevronRightIcon className={styles.icon} />
        </button>
        <button
          className={styles.chevronButton}
          disabled={page === Math.ceil(dataCount / limit) ? true : false}          
          onClick={() => lastPage()}
        >
          <ChevronDoubleRightIcon className={styles.icon} />
        </button>
      </div>
      
      <div className={styles.bottomTextWrapper}>
        <p className={styles.bottomText}>
          Page 
          <select
              className={styles.pageSelect}
              onChange={(e) => handleSelect(e)}
            >
              {pagesArray.map((pageItem) => (
                <option
                  key={pageItem}
                  value={pageItem}
                  selected={pageItem  === page ? true : false}
                >
                  {pageItem}
                </option>
              ))}
            </select>
          of {Math.ceil(dataCount / limit)}
        </p>
      </div>
    </div>
  );
};

export default Pagination;