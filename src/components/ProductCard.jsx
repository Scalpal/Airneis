import styles from "@/styles/ProductCard.module.css";
import { useRouter } from "next/router";

const ProductCard = (props) => {

  const { product } = props; 
  const router = useRouter(); 

  return (

    <div
      className={styles.productCard}
      onClick={() => router.push("/products/" + product.id)}
    >
      <div className={styles.productCardInfos}>
        <p> {product.name} </p>
        <p> {product.type} </p>
        <p> {product.price} </p>
      </div>
    </div>
  );
};

export default ProductCard;