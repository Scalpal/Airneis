import styles from "@/styles/backoffice/Table.module.css";
import { classnames } from "@/pages/_app";
import { PencilSquareIcon , TrashIcon} from "@heroicons/react/24/outline";

const Table = (props) => {

  const { array } = props; 

  return (
    <table className={classnames(
      styles.table,
    )}
    >
      <thead>     
        <tr>
          {Object.keys(array[0]).map((key, index) => (
            <th key={index}>{key}</th>
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
  );
};

export default Table; 