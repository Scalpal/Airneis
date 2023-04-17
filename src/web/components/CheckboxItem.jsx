import styles from "@/styles/components/CheckboxItem.module.css"; 
import { CheckIcon } from "@heroicons/react/24/solid";
import { useState, useCallback, useEffect } from "react";


const CheckboxItem = (props) => {
  const { name, value, queryKey ,handleQueryParamsFilters } = props;

  const [checked, setChecked] = useState(false); 

  const handleCheckbox = useCallback(() => {    
    handleQueryParamsFilters(queryKey, value);
    setChecked(checked ? false : true);

  }, [value, queryKey, handleQueryParamsFilters, checked]);

  useEffect(() => {
    console.log("checked", checked);
  }, [checked, setChecked]);

  return (
    <div
      className={styles.checkboxItem}
    >
      <input
        type="checkbox"
        value={value}
        name={name}
        id={value}
        // checked={}
        onClick={() => { handleCheckbox(); }}
      />
      <label
        htmlFor={value}
        className={checked && styles.checked}
      >
        {checked && <CheckIcon className={styles.icon} />}
      </label>
      <p>{name}</p>
    </div>
  );
};

export default CheckboxItem;