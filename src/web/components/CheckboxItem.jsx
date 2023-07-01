import { classnames } from "@/pages/_app";
import styles from "@/styles/components/CheckboxItem.module.css"; 
import { CheckIcon } from "@heroicons/react/24/solid";

const CheckboxItem = (props) => {
  const { name, value, checked, disabled, onChange } = props;

  return (
    <div
      className={styles.checkboxItem}
    >
      <input
        type="checkbox"
        value={value}
        name={name}
        id={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <label
        htmlFor={name}
        className={classnames(
          checked ? styles.checked : "",
          disabled ? styles.disabled : ""
        )}
      >
        {checked && <CheckIcon className={styles.icon} />}
      </label>
      <p>{name}</p>
    </div>
  );
};

export default CheckboxItem;