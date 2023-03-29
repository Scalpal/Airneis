import Carousel from "@/web/components/Carousel";
import ProductCard from "@/web/components/ProductCard";
import Banner from "@/web/components/Banner";
import Button from "@/web/components/Button";
import styles from "@/styles/productPage.module.css";

const placeholderImages = [
  "/meuble-1.jpeg",
  "/meuble-2.jpeg",
  "/meuble-3.png",
];

const productPrototype = {
  name: "Samsung TV OLED 4K",
  description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié.",
  price: 2499,
  stockAvailaible: 25
};

const similarProducts = [
  {
    id: 1,
    name: "chaise",
    type: "bois",
    price: "145$",
    imageSrc: "/meuble-2.jpeg",
  },
  {
    name: "table",
    type: "chêne",
    price: "105$",
    imageSrc: "/meuble-2.jpeg",
  },
  {
    name: "rideau",
    type: "laine",
    price: "45$",
    imageSrc: "/meuble-2.jpeg",
  },
  {
    name: "rideau",
    type: "laine",
    price: "45$",
    imageSrc: "/meuble-2.jpeg",
  },
  {
    name: "rideau",
    type: "laine",
    price: "45$",
    imageSrc: "/meuble-2.jpeg",
  },
  {
    name: "rideau",
    type: "laine",
    price: "45$",
    imageSrc: "/meuble-2.jpeg",
  },
  {
    name: "rideau",
    type: "laine",
    price: "45$",
    imageSrc: "/meuble-2.jpeg",
  },
  {
    name: "rideau",
    type: "laine",
    price: "45$",
    imageSrc: "/meuble-2.jpeg",
  },
];

const ProductPage = () => {

  return (
    <>
      <Banner title={productPrototype.name} />

      <main>

        <section className={styles.mainContent}>
          <div className={styles.productCarousel}>
            <Carousel images={placeholderImages} Autoplay={false} controls={true} />
          </div>


          <div className={styles.productInfos}>

            <div className={styles.productInfosTopBlock}>
              <h1>{productPrototype.name}</h1>
              <p>{productPrototype.description}</p>
            </div>

            <div className={styles.productInfosBottomBlock}>
              <p>{productPrototype.price}€</p>
              <p>
                {productPrototype.stockAvailaible > 0 ? "Stocks : " + productPrototype.stockAvailaible + " available" : "Out of stock"}
              </p>
            </div>

          </div>
        </section>

        <div className={styles.addToCartBtnWrapper}>
          <Button
            onClick={() => console.log("haha")}
          >
            Add to cart
          </Button>
        </div>

        <section className={styles.similarProductsWrapper}>

          <h1> Similar products </h1>

          <div className={styles.similarProductsContainer}>
            {similarProducts.map((product, index) => {
              return (
                <ProductCard
                  key={index}
                  product={product}
                />
              );
            })}
          </div>

        </section>
      </main>
    </>
  );
};
ProductPage.isPublic = true
export default ProductPage; 