import styles from "@/styles/components/CheckboxItem.module.css"
import { CheckIcon } from "@heroicons/react/24/solid"
import { useState, useCallback } from "react"

const CheckboxItem = (props) => {
  const {
    value,
    group,
    id,
    label,
    defaultChecked,
    onChangeEvent,
    ...otherProps
  } = props

  const [checked, setChecked] = useState(defaultChecked)

  const handleChange = useCallback(
    (event) => {
      const { checked, value } = event.target
      setChecked(checked)
      onChangeEvent({ name: group, value, checked })
    },
    [group, onChangeEvent]
  )

  return (
    <div className={styles.checkboxItem}>
      <input
        type="checkbox"
        value={value}
        id={id}
        onChange={handleChange}
        {...otherProps}
      />
      <label htmlFor={id} className={checked ? styles.checked : ""}>
        {checked && <CheckIcon className={styles.icon} />}
      </label>
      <p>{label}</p>
    </div>
  )
}

export default CheckboxItem
