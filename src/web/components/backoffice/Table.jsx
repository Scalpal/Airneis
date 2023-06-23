import styles from "@/styles/backoffice/Table.module.css";
import { classnames } from "@/pages/_app";
import { TrashIcon, InformationCircleIcon} from "@heroicons/react/24/outline";
import { useCallback } from "react";
import { ChevronUpIcon, ChevronDownIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { splitCamelCase } from "@/web/services/SplitCamelCase";

const Table = (props) => {
  const {
    array,
    safeArray,
    queryParams,
    sortColumn,
    visibleColumns,
    showSpecificRowFunction,
    deleteRowFunction,
  } = props;
  // safeArray is the array coming from getServerSideProps, it is always not empty so in case array is empty
  // we still have the table headers

  const showValue = useCallback((key, value, i) => {
    if (Array.isArray(value)) {
      return (
        value.map((obj, index) => (
          <p key={index}>
            {Object.entries(obj).map(([objKey, objValue]) => {   
              // This is adapted for object with this structure : { id: 1, name: "XXXX" }
              // Not fully adapted to all use cases
              if (objKey === "name") {
                return objValue;
              }
            }).join("- ").replaceAll(",", "")}
          </p>
        ))
      );
    }

    if (typeof value === "object") {
      return (
        <p>
          {value.name}
        </p>
      );
    }

    if (typeof value === "boolean") {
      return value ? (
        <CheckIcon className={styles.tableIcon} />
      ) : (
        <XMarkIcon className={styles.tableIcon} />
      );
    }

    return <p key={i}>{value && value.toString()}</p>;
  }, []);

  const showActionsButtons = useCallback(
    (itemId) => {
      return (
        <>
          {showSpecificRowFunction && (
            <td onClick={() => showSpecificRowFunction(itemId)}>
              <InformationCircleIcon className={styles.tableIcon} />
            </td>
          )}

          {/* {editRowFunction && (
          <td>
            <PencilSquareIcon className={styles.tableIcon} />
          </td>
        )} */}

          {deleteRowFunction && (
            <td onClick={() => deleteRowFunction(itemId)}>
              <TrashIcon className={styles.tableIcon} />
            </td>
          )}
        </>
      );
    },
    [deleteRowFunction, showSpecificRowFunction]
  );

  return (
    <table className={classnames(styles.table)}>
      <thead>
        <tr>
          {Object.keys(safeArray[0]).map((key, index) => (
            visibleColumns ? (
              visibleColumns.includes(key)) && (
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
            ) : (
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
            )
          ))}
          <th colSpan={2}>Actions</th>
        </tr>
      </thead>

      {array.length > 0 ? (
        <tbody>
          {array.map((item, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {/* Loop on the objects keys */}
                {Object.entries(item).map(([key, value], i) => {
                  return (
                    visibleColumns ? (
                      visibleColumns.includes(key) && (
                        <td key={i}>
                          {showValue(key, value, i)}
                        </td>
                      )
                    ): (
                      <td key={i}>
                        {showValue(key, value, i)}
                      </td>
                    )
                  );
                })}

                {showActionsButtons(item.id)}
              </tr>
            );
          })}
        </tbody>
      ) : (
        <tr className={styles.emptyTextRow} colSpan={10}>
          <td colSpan={10}>No entries found</td>
        </tr>
      )}
    </table>
  );
};

export default Table;
