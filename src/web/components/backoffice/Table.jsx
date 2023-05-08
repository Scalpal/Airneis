import styles from "@/styles/backoffice/Table.module.css";
import { classnames } from "@/pages/_app";
import { PencilSquareIcon , TrashIcon} from "@heroicons/react/24/outline";
import { useCallback } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

const Table = (props) => {
  const { array, safeArray, queryParams, sortColumn } = props;
  // safeArray is the array coming from getServerSideProps, it is always not empty so in case array is empty
  // we still have the table headers

  const splitCamelCase = useCallback((str) => {
    const words = str.match(/[a-z]+|[A-Z][a-z]*/g);
    
    if (!words) {
      return str;
    }
    
    return words.join(" ");
  }, []);

  return (
    <table className={classnames(
      styles.table,
    )}
    >
      <thead>     
        <tr>
          {Object.keys(safeArray[0]).map((key, index) => (
            <th
              key={index}
              onClick={() => { sortColumn(key); }}
            >
              <p>
                <span>{splitCamelCase(key)}</span>

                {queryParams["orderField"] === key && (
                  queryParams["order"] === "asc" ? (
                    <ChevronUpIcon className={styles.headerIcon} />
                  ): (
                    <ChevronDownIcon className={styles.headerIcon} />
                  )
                )}
              </p>
            </th>
          ))}
          <th colSpan={2}>Actions</th>
        </tr>
      </thead>
      
      {array.length > 0 ? (
        <tbody>
          {array.map((item, index) => {
            return (
              <tr key={index}>
                {/* Loop on the objects keys */}
                {Object.entries(item).map(([_, value], i) => {

                  return (
                    <td key={i}>

                      {/* We check if it's an array for the case if one of the item has an array inside it */}
                      {Array.isArray(value) ? (

                        // Loop on the value that IS an array
                        value.map((valueItem, index) => (

                          <p key={index}>
                            {Object.entries(valueItem).map(([_, objValue]) => {

                              return (
                                objValue + " - "
                              );
                            })}
                          </p>
                        ))
                      ) : (
                        <p key={i}>{value.toString()}</p>
                      )}
                    </td>
                  );
                })}
                <td><PencilSquareIcon className={styles.tableIcon} /></td>
                <td><TrashIcon className={styles.tableIcon} /></td>
              </tr>
            );
          })}
        </tbody>
      ) : (
        <tr
          className={styles.emptyTextRow}
          colSpan={10}
        >
          <td colSpan={10}>No entries found</td>
        </tr>
      )}
    </table>
  );
};

export default Table; 