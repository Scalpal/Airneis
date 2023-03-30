import { useRouter } from "next/router";
import styles from "@/styles/components/DetailedProductCard.module.css";
import Image from "next/image";
import Button from "./Button";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

const DetailedProductCard = (props) => {

  const { product } = props;  
  const router = useRouter();

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
          src={product.imageSrc}
          alt={"Image du produit"}
          fill
        />
      </div>


      <div className={styles.productCardInfos}>
        {/* <span className={styles.productCardInfoStock}>{product.stock} available</span> */}

        <p className={styles.productCardInfoName}> {product.name} </p>

        <div className={styles.ellipsisWrapper}>
          <p className={styles.productCardInfoDescription}>{product.description}</p>
        </div>


        <div
          className={styles.showMoreButton}
          onClick={() => router.push("/products/" + product.id)}
        >
          <p>Voir plus</p>
          <ArrowRightIcon className={styles.showMoreIcon} />
        </div>

        <div className={styles.priceStockWrapper}>
          <p className={styles.productCardInfoPrice}> {product.price} </p>
          <span className={styles.productCardInfoStock}>{product.stock} available</span>
        </div>

        <div className={styles.productCardInfoBtnWrapper}>
          <Button>
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailedProductCard; 