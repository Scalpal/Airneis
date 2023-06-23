import styles from "@/styles/components/ProductImageInput.module.css"
import { PlusCircleIcon } from "@heroicons/react/24/outline"


const ProductImageInput = (props) => {
  const { images, onChangeEvent } = props

  return (
    <>
      <input
        className={styles.input}
        type="file"
        name="file"
        id="file"
        onChange={(e) => onChangeEvent([...images, e.target.files[0]])}
        hidden
      />

      <label
        className={styles.label}
        htmlFor="file"
      >
        <PlusCircleIcon className={styles.icon} />
        Add a product image
      </label>
    </>
  )
}

export default ProductImageInput