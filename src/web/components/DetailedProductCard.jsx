import { useRouter } from "next/router";
import styles from "@/styles/components/DetailedProductCard.module.css";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Button from "./Button";
import { useCallback } from "react";
import useAppContext from "../hooks/useAppContext";

const DetailedProductCard = (props) => {

  const { product } = props;  
  const router = useRouter();
  const { actions: { setCart }, state: { cart } } = useAppContext();

  const addToCart = useCallback(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const localStorageProducts = JSON.parse(localStorage.getItem("products"));

      // Create the array of products in localStorage (init an array of products on first add)
      if (!Array.isArray(localStorageProducts)) {
        const arrayProducts = []; 

        product.quantity = 1; 
        arrayProducts.push(product);
        localStorage.setItem("products", JSON.stringify(arrayProducts));
        setCart(arrayProducts);

        return; 
      }
      
      const productIndex = localStorageProducts.findIndex((elt) => elt.id === product.id);

      // If product is not already in the cart, we add it
      if (productIndex === -1) {
        product.quantity = 1; 
        localStorage.setItem("products", JSON.stringify([...localStorageProducts, product]));
        setCart([...cart, product]);

        return;
      }

      //Otherwise, we increment it's quantity
      localStorageProducts[productIndex].quantity++; 
      localStorage.setItem("products", JSON.stringify(localStorageProducts));
      setCart(localStorageProducts);
    }
  }, [product, cart, setCart]);

  return (
    <div
      className={styles.productCard}
    >
      <div
        className={styles.productCardImageContainer}
        onClick={() => router.push("/products/" + product.id)}
      >
        <Image
          className={styles.productCardImage}
          src={product.picture}
          alt={"Image du produit"}
          fill
        />
      </div>

      <div
        className={styles.productCardInfos}
      >

        <p className={styles.productCardInfoName}> {product.name} </p>

        <div className={styles.descriptionWrapper}>
          <p className={styles.productCardInfoDescription}>{product.description}</p>
        </div>

        <div
          className={styles.showMoreButton}
          onClick={() => router.push("/products/" + product.id)}
        >
          <p>Voir plus</p>
          <ArrowRightIcon className={styles.showMoreIcon} />
        </div>

        <div className={styles.productMaterialWrapper}>
          <p>Matériaux : {product.materials.map((material, index) => {
            const comma = index === product.materials.length - 1 ? " " : ", ";

            return material + comma;
          })}</p>
        </div>

        <div className={styles.priceStockWrapper}>
          <p className={styles.productCardInfoPrice}> {product.price} </p>
          <span className={styles.productCardInfoStock}>{product.stock} available</span>
        </div>

        <div className={styles.productCardInfoBtnWrapper}>
          <Button
            onClick={() => addToCart()}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailedProductCard; 