import styles from "@/styles/backoffice/ActionBar.module.css"; 
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Select from "../Select";
import Pagination from "./Pagination";


const ActionBar = (props) => {

  const { label, setSearchValue, handleLimit, dataCount, queryParams, handleQueryParams } = props;

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

      <Pagination
        dataCount={dataCount}
        queryParams={queryParams}
        handleQueryParams={handleQueryParams}
      />
    </div>
  );
};

export default ActionBar;