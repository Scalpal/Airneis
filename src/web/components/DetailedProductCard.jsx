import { useRouter } from "next/router"
import styles from "@/styles/components/DetailedProductCard.module.css"
import Image from "next/image"
import routes from "@/web/routes"
import { ArrowRightIcon } from "@heroicons/react/24/solid"
import Button from "./Button"
import CircleAnimation from "./circleAnimation"
import useAppContext from "../hooks/useAppContext"
import { useState } from "react"

const DetailedProductCard = (props) => {
  const { product } = props
  const router = useRouter()
  const [bubbleAnimation, setBubbleAnimation] = useState(null)
  const {
    actions: { addToCart },
  } = useAppContext()

  const handleAddToCart = () => {
    !bubbleAnimation && setBubbleAnimation(true)
    addToCart(product)

    setTimeout(() => {
      setBubbleAnimation(false)
    }, 1900)
  }

  return (
    <div className={styles.productCard}>
      <div
        className={styles.productCardImageContainer}
        onClick={() => router.push(routes.query.products(product.id))}
      >
        <Image
          className={styles.productCardImage}
          src={product.images[0].imageSrc}
          alt={"Image du produit"}
          fill
        />
      </div>

      <div className={styles.productCardInfos}>
        <p className={styles.productCardInfoName}> {product.name} </p>

        <div className={styles.descriptionWrapper}>
          <p className={styles.productCardInfoDescription}>
            {product.description}
          </p>
        </div>

        <div
          className={styles.showMoreButton}
          onClick={() => router.push(routes.query.products(product.id))}
        >
          <p>Voir plus</p>
          <ArrowRightIcon className={styles.showMoreIcon} />
        </div>

        <div className={styles.productMaterialWrapper}>
          <p>
            Matériaux :{" "}
            {product.materials.map((material, index, arr) => {
              const comma = index < arr.length - 1 ? ", " : ""

              return material.name + comma
            })}
          </p>
        </div>

        <div className={styles.priceStockWrapper}>
          <p className={styles.productCardInfoPrice}> {product.price}$</p>
          <span className={styles.productCardInfoStock}>
            {product.stock} available
          </span>
        </div>

        <div className={styles.productCardInfoBtnWrapper}>
          <Button bgWhite={bubbleAnimation} onClick={handleAddToCart}>
            Add to cart
            {bubbleAnimation && <CircleAnimation />}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DetailedProductCard
