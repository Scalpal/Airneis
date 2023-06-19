import styles from "@/styles/components/RadioItem.module.css"
import { CheckIcon } from "@heroicons/react/24/outline"

const RadioItem = (props) => {
  const { label, name, value, inputId, checked, ...otherProps } = props

  return (
    <div
      className={styles.checkboxItem}
    >
      <input
        type="radio"
        value={value}
        name={name}
        id={inputId}
        {...otherProps}
      />
      <label
        htmlFor={inputId}
        className={checked ? styles.checked : ""}
      >
        {checked && <CheckIcon className={styles.icon} />}
      </label>
      <p>{label}</p>
    </div>
  )
}

export default RadioItem