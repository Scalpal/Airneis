import Image from "next/image";
import styles from "@/styles/components/CartProduct.module.css";
import { useCallback } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

const CartProduct = (props) => {

  const { product, index, productState, totalSumState } = props;
  const [productsList, setProductsList] = productState;
  const [totalSum, setTotalSum] = totalSumState;
  
  const deleteProduct = useCallback((index) => {
    const currentProduct = productsList[index];

    setTotalSum(totalSum - product.price * product.quantity);
    setProductsList(
      productsList.filter((product) => product.id !== currentProduct.id)
    );
  }, [productsList, totalSum, setProductsList, setTotalSum, product.price, product.quantity]); 

  const addProduct = useCallback((index) => {
    const product = productsList[index];

    if (product.quantity > 99) {
      return;
    }

    product.quantity++;
    setTotalSum(totalSum + product.price);
  }, [productsList, setTotalSum, totalSum]);

  const removeProduct = useCallback((index) => {
    const product = productsList[index];

    if (product.quantity === 1) {
      deleteProduct(index);
      return;
    }

    product.quantity--;
    setTotalSum(totalSum - product.price);
  }, [productsList, totalSum, deleteProduct, setTotalSum ]);



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
        <p className={styles.cartProductInfoName}>Product #{index}</p>
        <p className={styles.cartProductInfoDescription}>{product.description}</p>
      </div>

      <div className={styles.cartProductControls}>

        <p>{productsList[index].price * productsList[index].quantity}€</p>
        
        <div className={styles.cartProductControlsQuantity}>
          <button onClick={() => { removeProduct(index); }}>-</button>
          <p>{product.quantity}</p>
          <button onClick={() => { addProduct(index);  }}>+</button>
        </div>

        <TrashIcon
          className={styles.cartProductControlIcon}
          onClick={() => { deleteProduct(index); }}
        />
      </div>
    </div>
  );
}; 

export default CartProduct; 