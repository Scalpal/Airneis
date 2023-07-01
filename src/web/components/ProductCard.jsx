import styles from "@/styles/components/ProductCard.module.css";
import { useRouter } from "next/router";
import ImageWithFallback from "./ImageWithFallback";

const ProductCard = (props) => {
  const { product } = props; 
  const router = useRouter(); 

  return (

    <div
      className={styles.productCard}
      onClick={() => router.push("/products/" + product.id)}
    >
      <div className={styles.productCardImageContainer}>

        <ImageWithFallback
          className={styles.productImage}
          alt={"Product image"}
          src={typeof product.productImages[0] !== "undefined" ?  product.productImages[0].imageUrl : "/product-image-placeholder.jpg"}
          fallbackSrc={`/placeholder-image.png`}
          fill
        />
      </div>

      <div className={styles.productCardInfos}>
        <p> {product.name} </p>
        <p> {product.price}$ </p>
      </div>
    </div>
  );
};

export default ProductCard;