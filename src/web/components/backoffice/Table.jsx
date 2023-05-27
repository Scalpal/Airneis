import styles from "@/styles/backoffice/Table.module.css";
import { classnames } from "@/pages/_app";
import { PencilSquareIcon , TrashIcon} from "@heroicons/react/24/outline";

const Table = (props) => {

  const splitCamelCase = useCallback((str) => {
    const words = str.match(/[a-z]+|[A-Z][a-z]*/g)

    if (!words) {
      return str
    }

    return words.join(" ")
  }, [])

  const showValue = useCallback((key, value, i) => {
    if (Array.isArray(value)) {
      // Loop on the value that IS an array
      return value.map((valueItem, index) => (
        <p key={index}>
          {/* eslint-disable-next-line no-unused-vars */}
          {Object.entries(valueItem).map(([_, objValue]) => {
            return objValue + " - "
          })}
        </p>
      ))
    }

    if (typeof value === "boolean") {
      return value ? (
        <CheckIcon className={styles.tableIcon} />
      ) : (
        <XMarkIcon className={styles.tableIcon} />
      )
    }

    return <p key={i}>{value.toString()}</p>
  }, [])

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
      )
    },
    [deleteRowFunction, showSpecificRowFunction]
  )

  return (
    <table className={classnames(styles.table)}>
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
                      <p key={i}>{value}</p>
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
    </table>
  )
}

export default Table
