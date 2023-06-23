import styles from "@/styles/components/ProductCard.module.css"
import { useRouter } from "next/router"
import routes from "@/web/routes"
import Image from "next/image"

const ProductCard = (props) => {
  const { product } = props; 
  const router = useRouter(); 

  return (
    <div
      className={styles.productCard}
      onClick={() => router.push(routes.queryPage.products(product.id))}
    >
      <div className={styles.productCardImageContainer}>
        <Image
          className={styles.productCardImage}
          // src={typeof product.productImages[0] !== "undefined" ?  product.productImages[0].imageUrl : "/product-image-placeholder.jpg"}
          src="/meuble-2.jpeg"
          alt={"Image du produit"}
          fill
        />
      </div>

      <div className={styles.productCardInfos}>
        <p> {product.name} </p>
        <p> {product.price}$ </p>
      </div>
    </div>
  )
}

export default ProductCard
