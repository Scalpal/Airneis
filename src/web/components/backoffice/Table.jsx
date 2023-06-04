import styles from "@/styles/backoffice/Table.module.css"
import { classnames } from "@/pages/_app"
import { TrashIcon, InformationCircleIcon } from "@heroicons/react/24/outline"
import { useCallback } from "react"
import {
  ChevronUpIcon,
  ChevronDownIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid"

const Table = (props) => {
  const {
    array,
    safeArray,
    queryParams,
    sortColumn,
    showSpecificRowFunction,
    deleteRowFunction,
  } = props
  // safeArray is the array coming from getServerSideProps, it is always not empty so in case array is empty
  // we still have the table headers

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
              onClick={() => {
                sortColumn(key)
              }}
            >
              <p>
                <span>{splitCamelCase(key)}</span>

                {queryParams["orderField"] === key &&
                  (queryParams["order"] === "asc" ? (
                    <ChevronUpIcon className={styles.headerIcon} />
                  ) : (
                    <ChevronDownIcon className={styles.headerIcon} />
                  ))}
              </p>
            </th>
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
                  return <td key={i}>{showValue(key, value, i)}</td>
                })}

                {showActionsButtons(item.id)}
              </tr>
            )
          })}
        </tbody>
      ) : (
        <tr className={styles.emptyTextRow} colSpan={10}>
          <td colSpan={10}>No entries found</td>
        </tr>
      )}
    </table>
  )
}

export default Table
