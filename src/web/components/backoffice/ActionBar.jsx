import styles from "@/styles/backoffice/ActionBar.module.css"; 
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Select from "../Select";
import Pagination from "./Pagination";
import { useEffect, useState } from "react";


const ActionBar = (props) => {

  const { label, handleLimit, dataCount, queryParams, setQueryParams, handleQueryParams } = props;

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const searchInput = document.getElementById("searchInput");

    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        setQueryParams({
          ...queryParams,
          page: 1,
          search: searchValue
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
          <input type="text" id="searchInput" placeholder="Search" onChange={(e) => setSearchValue(e.target.value)} />
          <MagnifyingGlassIcon className={styles.actionBarIcon} />
        </div>

        <Select
          defaultValue={10}
          onChange={(e) => handleLimit(Number.parseInt(e.target.value))}
        >
          <option>Limit per page</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </Select>
      </div>

      {dataCount > 0 && (
        <Pagination
          dataCount={dataCount}
          queryParams={queryParams}
          handleQueryParams={handleQueryParams}
        />
      )}

    </div>
  );
};

export default ActionBar;