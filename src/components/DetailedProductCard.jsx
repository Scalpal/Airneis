import { useRouter } from "next/router";
import styles from "@/styles/DetailedProductCard.module.css";
import Image from "next/image";

const DetailedProductCard = (props) => {

  const { product } = props;  
  const router = useRouter();

  return (
    <div
      className={styles.productCard}
      onClick={() => router.push("/products/" + product.id)}
    >
      <div className={styles.productCardInfos}>
        <span className={styles.productCardInfoStock}>{product.stock} available</span>

        <p className={styles.productCardInfoName}> {product.name} </p>
        <p className={styles.productCardInfoPrice}> {product.price} </p>
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

export default DetailedProductCard; 