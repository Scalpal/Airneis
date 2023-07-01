import { useRouter } from "next/router";
import styles from "@/styles/components/DetailedProductCard.module.css";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Button from "./Button";
import useAppContext from "../hooks/useAppContext";
import routes from "../routes";
import ProductRating from "./ProductRating";
import ImageWithFallback from "./ImageWithFallback";

const DetailedProductCard = (props) => {
  const { product } = props;  
  const router = useRouter();
  const { actions: { addToCart } } = useAppContext();
  
  return (
    <div
      className={styles.productCard}
    >
      <div
        className={styles.productCardImageContainer}
        onClick={() => router.push(routes.products.single(product.id))}
      >
        {/* <Image
          className={styles.productCardImage}
          src={typeof product.productImages[0] !== "undefined" ?  product.productImages[0].imageUrl : "/product-image-placeholder.jpg"}
          alt={product.name} 
          fill
        /> */}
      <ImageWithFallback
        className={styles.image}
        alt={"Product image"}
        src={product.productImages[0].imageUrl ? product.productImages[0].imageUrl : `${process.env.AWS_BUCKET_URL}${product.productImages[0].imageSrc}`}
        fallbackSrc={`/placeholder-image.png`}
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
          onClick={() => router.push(routes.products.single(product.id))}
        >
          <p>See more</p>
          <ArrowRightIcon className={styles.showMoreIcon} />
        </div>

        <div className={styles.productMaterialWrapper}>
          <p>Materials : {product.materials.map(({ name }, index) => {
            const comma = (index === product.materials.length - 1) ? " " : ", ";

            return name + comma;
          })}</p>
        </div>

        <ProductRating
          rating={product.rating}
          totalReviews={product.reviews.length}
        />

        <div className={styles.priceStockWrapper}>
          <p className={styles.productCardInfoPrice}> {product.price}$ </p>
          <span className={styles.productCardInfoStock}>{product.stock} available</span>
        </div>

        <div className={styles.productCardInfoBtnWrapper}>
          <Button
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailedProductCard; 