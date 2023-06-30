import styles from "@/styles/backoffice/ActionBar.module.css"; 
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Select from "../Select";
import Pagination from "./Pagination";
import { useCallback, useEffect, useState } from "react";
import Button from "../Button";


const ActionBar = (props) => {
  const { label, handleLimit, dataCount, queryParams, setQueryParams, handleQueryParams, addRowFunction } = props;

  const [searchValue, setSearchValue] = useState("");

  // Handle pagination
  const setPage = useCallback((value) => {
    handleQueryParams("page", value);
  }, [handleQueryParams]);

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

  useEffect(() => {
    const searchInput = document.getElementById("searchInput");

    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        setQueryParams({
          ...queryParams,
          page: 1,
          search: searchValue,
        });
      }
    };
    searchInput.addEventListener("keydown", handleKeyDown);

    return () => {
      searchInput.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchValue, queryParams, setQueryParams]);

  return (
    <div className={styles.actionBar}>
      <div>
        <p>{label}</p>

        <div className={styles.customSearchInput}>
          <input
            type="text"
            id="searchInput"
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <MagnifyingGlassIcon className={styles.actionBarIcon} />
        </div>

        <Select
          defaultValue={10}
          onChange={(e) => handleLimit(Number.parseInt(e.target.value))}
        >
          <option disabled>Limit per page</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </Select>

        {addRowFunction && (
          <Button onClick={() => addRowFunction()}>
            Add a product
          </Button>
        )}

      </div>

      {dataCount > 0 && (
        <Pagination
          dataCount={dataCount}
          page={queryParams.page}
          limit={queryParams.limit}
          setPage={setPage}
          firstPage={firstPage}
          lastPage={lastPage}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      )}
    </div>
  );
};

export default ActionBar;
