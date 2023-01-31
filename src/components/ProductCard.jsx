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
        <p> <strong>{product.name}</strong> </p>
        <p> {product.type} </p>
        <p> <strong>{product.price}</strong> </p>
      </div>
    </div>
  );
};

export default ProductCard;