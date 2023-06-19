import { useRouter } from "next/router";
import styles from "@/styles/components/DetailedProductCard.module.css";
import Image from "next/image";
import routes from "@/web/routes";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Button from "./Button";
import useAppContext from "../hooks/useAppContext";
import routes from "../routes";
import ProductRating from "./ProductRating";

const DetailedProductCard = (props) => {
  const { product } = props;  
  const router = useRouter();
  const [bubbleAnimation, setBubbleAnimation] = useState(null);
  const {
    actions: { addToCart },
  } = useAppContext();

  const handleAddToCart = () => {
    !bubbleAnimation && setBubbleAnimation(true);
    addToCart(product);

    setTimeout(() => {
      setBubbleAnimation(false);
    }, 1900);
  };

  return (
    <div className={styles.productCard}>
      <div
        className={styles.productCardImageContainer}
        onClick={() => router.push(routes.products.single(product.id))}
      >
        <Image
          className={styles.productCardImage}
          src={"/meuble-1.jpeg"}
          alt={"Image du produit"}
          fill
        />
      </div>

      <div
        className={styles.productCardInfos}
      >        
        <p className={styles.productCardInfoName}> {product.name} </p>

        <div className={styles.descriptionWrapper}>
          <p className={styles.productCardInfoDescription}>
            {product.description}
          </p>
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
    
        <ProductRating rating={product.rating} totalReviews={product.reviews.length} />

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
