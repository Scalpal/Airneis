import Image from "next/image"
import styles from "@/styles/components/CartProduct.module.css"
import { TrashIcon, ChevronDownIcon } from "@heroicons/react/24/solid"
import useAppContext from "../hooks/useAppContext"
import { useState } from "react"

const CartProduct = (props) => {
  const { product } = props
  const {
    actions: { changeValuesProductFromCart, deleteProductFromCart },
  } = useAppContext()
  const [inputValue, setInputValue] = useState(product.quantity)

  const handleValueChange = (event) => {
    if (parseInt(event.target.value) >= 0) {
      const updatedQuantity = parseInt(event.target.value)
      changeValuesProductFromCart({ product, values: updatedQuantity })
    }
  }

  const getDisplayValue = (value) => {
    if (value === 0) {
      return `${value} (supprimer)`
    } else if (value === 10) {
      return `${value}+`
    } else {
      return value.toString()
    }
  }

  const handleInputChange = (event) => {
    if (parseInt(event.target.value) >= 0) {
      setInputValue(parseInt(event.target.value))
    }
  }

  const handleButtonClick = () => {
    changeValuesProductFromCart({ product, values: inputValue })
  }

  return (
    <div className={styles.cartProduct}>
      <div className={styles.cartProductImageContainer}>
        <Image
          src={product.images[0].imageSrc}
          alt="Image du produit"
          fill
          className={styles.cartProductImage}
        />
      </div>

      <div className={styles.cartProductInfo}>
        <div className={styles.cartProductInfoNameWrapper}>
          <p className={styles.cartProductInfoName}>{product.name}</p>
        </div>

        <div className={styles.cartProductInfoDescriptionWrapper}>
          <p>{product.description}</p>
        </div>
      </div>

      <div className={styles.cartProductControls}>
        <p>{product.price * product.quantity}$</p>
        <span className={styles.unityPrice}>({product.price}$ / unity)</span>

        <div className={styles.cartProductSelectQuantity}>
          {product.quantity < 10 ? (
            <div className={styles.cartProductContentSelect}>
              <span>Qty:</span>
              <span className={styles.cartProductQuantityValues}>
                {product.quantity}
              </span>
              <ChevronDownIcon />
              <select
                value={product.quantity}
                className={styles.cartProductSelect}
                onChange={handleValueChange}
              >
                {[...Array(11)].map((_, index) => (
                  <option key={index} value={index}>
                    {getDisplayValue(index)}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className={styles.cartProductInputContent}>
              <input
                type="number"
                defaultValue={product.quantity}
                className={styles.cartProductInputValues}
                onChange={handleInputChange}
              />
              <button onClick={handleButtonClick}>Sauvegarder</button>
            </div>
          )}
        </div>

        <TrashIcon
          className={styles.cartProductControlIcon}
          onClick={() => {
            deleteProductFromCart(product)
          }}
        />
      </div>
    </div>
  )
}

export default CartProduct
