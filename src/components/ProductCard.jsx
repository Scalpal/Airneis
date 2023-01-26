import styles from "@/styles/ProductCard.module.css";

const ProductCard = (props) => {

  const { product } = props; 

  return (

    <div
      className={styles.productCard}
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