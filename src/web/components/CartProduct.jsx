import Image from "next/image";
import styles from "@/styles/components/CartProduct.module.css";
import { TrashIcon } from "@heroicons/react/24/solid";
import useAppContext from "../hooks/useAppContext";

const CartProduct = (props) => {
  const { product, index, productState } = props;
  const {
    actions: { addToCart, removeProductFromCart, deleteProductFromCart }
  } = useAppContext();

  const [productsList] = productState;

  return (
    <div className={styles.cartProduct}>
      <div className={styles.cartProductImageContainer}>
        <Image
          src={product.picture}
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
        <p>{productsList[index].price * productsList[index].quantity}€</p>

        <div className={styles.cartProductControlsQuantity}>
          <button
            onClick={() => {
              removeProductFromCart(product);
            }}
          >
            -
          </button>
          <p>{product.quantity}</p>
          <button
            onClick={() => {
              addToCart(product);
            }}
          >
            +
          </button>
        </div>

        <TrashIcon
          className={styles.cartProductControlIcon}
          onClick={() => {
            deleteProductFromCart(product);
          }}
        />
      </div>
    </div>
  );
};

export default CartProduct;
