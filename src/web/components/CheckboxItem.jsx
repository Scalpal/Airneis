import styles from "@/styles/components/CheckboxItem.module.css"; 
import { CheckIcon } from "@heroicons/react/24/solid";

const CheckboxItem = (props) => {
  const { name, value, checked, ...otherProps } = props;

  return (
    <div
      className={styles.checkboxItem}
    >
      <input
        type="checkbox"
        value={value}
        name={name}
        id={name}
        {...otherProps}
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