import styles from "@/styles/components/ProductCard.module.css";
import { useRouter } from "next/router";
import Image from "next/image";

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

      <Image
        className={styles.productCardImage}
        src={product.imageSrc}
        alt={"Image du produit"}
        fill
      />
    </div>
  );
};

export default ProductCard;