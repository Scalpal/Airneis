import styles from "@/styles/components/CheckboxItem.module.css"; 
import { CheckIcon } from "@heroicons/react/24/solid";
import { useState, useCallback } from "react";


const CheckboxItem = (props) => {
  const { name, value, queryKey, queryParams, handleQueryParamsFilters } = props;

  const [checked, setChecked] = useState(false); 

  const handleCheckbox = useCallback(() => { 
    if (typeof queryParams[queryKey] === "boolean") {
      handleQueryParamsFilters(queryKey, { name: name, value: value });
      setChecked(!checked);

      return;
    }

    handleQueryParamsFilters(queryKey, { name: name, value: value });
    setChecked(!checked);

  }, [name, value, queryKey, queryParams, handleQueryParamsFilters, checked]);

  // const isValueChecked = useCallback(() => {
  //   const bool = queryParams[queryKey].findIndex((elt) => elt.value === id) === -1 ? false : true;
    
  //   setChecked(bool ? true : false); 
  // }, [queryParams, queryKey, id]);

  // useEffect(() => {
  //   isValueChecked();
  // }, [isValueChecked]);

  return (
    <div
      className={styles.checkboxItem}
    >
      <input
        type="checkbox"
        value={value}
        name={name}
        id={name}
        onClick={() => { handleCheckbox(); }}
      />
      <label
        htmlFor={name}
        className={checked ? styles.checked : ""}
      >
        {checked && <CheckIcon className={styles.icon} />}
      </label>
      <p>{name}</p>
    </div>
  );
};

export default CheckboxItem;