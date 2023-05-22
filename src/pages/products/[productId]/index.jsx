import Carousel from "@/web/components/Carousel"
import ProductCard from "@/web/components/ProductCard"
import Banner from "@/web/components/Banner"
import Button from "@/web/components/Button"
import styles from "@/styles/productPage.module.css"
import useAppContext from "@/web/hooks/useAppContext"
import CircleAnimation from "@/web/components/circleAnimation"
import { useState } from "react"
import { useRouter } from "next/router"

const placeholderImages = ["/meuble-1.jpeg", "/meuble-2.jpeg", "/meuble-3.png"]

const AllProducts = [
  {
    id: 1,
    name: "Chaise moderne en bois de hêtre",
    type: "bois",
    description:
      "Chaises noir en bois de hêtre centenaire d'Himalayad,zkdanaldza nzdn lkdn jlkdznland kzalzdnalkd nkldzndzlaknalkn",
    price: 200,
    stock: 25,
    picture: "/meuble-2.jpeg",
    materials: ["métal", "acier", "fer"],
  },
  {
    id: 2,
    name: "chaise",
    type: "bois",
    price: 29,
    stock: 25,
    picture: "/meuble-2.jpeg",
    materials: ["métal", "acier", "fer"],
  },
  {
    id: 3,
    name: "chaise",
    type: "bois",
    description: "Chaises noir en bois de hêtre centenaire d'Himalaya",
    price: 87,
    stock: 25,
    picture: "/meuble-2.jpeg",
    materials: ["métal", "acier", "fer"],
  },
  {
    id: 4,
    name: "chaise",
    type: "bois",
    price: 129,
    stock: 25,
    picture: "/meuble-2.jpeg",
    materials: ["métal", "acier", "fer"],
  },
  {
    id: 5,
    name: "chaise",
    type: "bois",
    description: "Chaises noir en bois de hêtre centenaire d'Himalaya",
    price: 987,
    stock: 25,
    picture: "/meuble-2.jpeg",
    materials: ["métal", "acier", "fer"],
  },
  {
    id: 6,
    name: "chaise",
    type: "bois",
    price: 100,
    stock: 25,
    picture: "/meuble-2.jpeg",
    materials: ["métal", "acier", "fer"],
  },
]

const similarProducts = [
  {
    id: 1,
    name: "Chair",
    type: "Wood",
    price: "$145",
    imageSrc: "/meuble-2.jpeg",
  },
  {
    name: "Table",
    type: "Oak",
    price: "$105",
    imageSrc: "/meuble-2.jpeg",
  },
  {
    name: "Curtain",
    type: "Wool",
    price: "$45",
    imageSrc: "/meuble-2.jpeg",
  },
  {
    name: "Curtain",
    type: "Wool",
    price: "$45",
    imageSrc: "/meuble-2.jpeg",
  },
  {
    name: "Curtain",
    type: "Wool",
    price: "$45",
    imageSrc: "/meuble-2.jpeg",
  },
  {
    name: "Curtain",
    type: "Wool",
    price: "$45",
    imageSrc: "/meuble-2.jpeg",
  },
  {
    name: "Curtain",
    type: "Wool",
    price: "$45",
    imageSrc: "/meuble-2.jpeg",
  },
  {
    name: "Curtain",
    type: "Wool",
    price: "$45",
    imageSrc: "/meuble-2.jpeg",
  },
]

const ProductPage = () => {
  const [bubbleAnimation, setBubbleAnimation] = useState(null)
  const router = useRouter()
  const { productId } = router.query
  const {
    actions: { addToCart },
  } = useAppContext()
  const currentProduct = AllProducts.filter(
    (product) => product.id === Number.parseInt(productId)
  )[0]

  const handleAddToCart = () => {
    !bubbleAnimation && setBubbleAnimation(true)
    addToCart(currentProduct)

    setTimeout(() => {
      setBubbleAnimation(false)
    }, 1900)
  }

  return (
    <>
      <Banner title={currentProduct.name} />

      <main>
        <section className={styles.mainContent}>
          <div className={styles.productCarousel}>
            <Carousel
              images={placeholderImages}
              Autoplay={false}
              controls={true}
            />
          </div>

          <div className={styles.productInfos}>
            <div className={styles.productInfosTopBlock}>
              <h1>{currentProduct.name}</h1>
              <p>{currentProduct.description}</p>
            </div>

            <div className={styles.productInfosBottomBlock}>
              <p>{currentProduct.price}€</p>
              <p>
                {currentProduct.stock > 0
                  ? "Stocks : " + currentProduct.stock + " available"
                  : "Out of stock"}
              </p>
            </div>
          </div>
        </section>

        <div className={styles.addToCartBtnWrapper}>
          <Button bgWhite={bubbleAnimation} onClick={handleAddToCart}>
            Add to cart
            {bubbleAnimation && <CircleAnimation />}
          </Button>
        </div>

        <section className={styles.similarProductsWrapper}>
          <h1> Similar products </h1>

          <div className={styles.similarProductsContainer}>
            {similarProducts.map((product, index) => {
              return <ProductCard key={index} product={product} />
            })}
          </div>
        </section>
      </main>
    </>
  )
}
export default ProductPage
