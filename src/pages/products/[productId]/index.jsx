import Carousel from "@/web/components/Carousel";
import ProductCard from "@/web/components/ProductCard";
import Banner from "@/web/components/Banner";
import Button from "@/web/components/Button";
import styles from "@/styles/productPage.module.css";

const placeholderImages = ["/meuble-1.jpeg", "/meuble-2.jpeg", "/meuble-3.png"];

const productPrototype = {
  name: "Samsung TV OLED 4K",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consectetur ipsum eu fermentum pulvinar. Donec vitae egestas elit. Pellentesque et elementum nunc. Fusce a ligula nunc. Nunc interdum enim odio, id placerat ex convallis nec. Nam tempus sagittis libero, a cursus ipsum ullamcorper non. Duis quam lectus, volutpat non nisi.",
  price: 2499,
  stockAvailaible: 25,
};

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
];

const ProductPage = () => {
  return (
    <>
      <Banner title={productPrototype.name} />

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
              <h1>{productPrototype.name}</h1>
              <p>{productPrototype.description}</p>
            </div>

            <div className={styles.productInfosBottomBlock}>
              <p>{productPrototype.price}€</p>
              <p>
                {productPrototype.stockAvailaible > 0
                  ? "Stocks : " +
                    productPrototype.stockAvailaible +
                    " available"
                  : "Out of stock"}
              </p>
            </div>
          </div>
        </section>

        <div className={styles.addToCartBtnWrapper}>
          <Button onClick={() => console.log("haha")}>Add to cart</Button>
        </div>

        <section className={styles.similarProductsWrapper}>
          <h1> Similar products </h1>

          <div className={styles.similarProductsContainer}>
            {similarProducts.map((product, index) => {
              return <ProductCard key={index} product={product} />;
            })}
          </div>
        </section>
      </main>
    </>
  );
};
ProductPage.isPublic = true;
export default ProductPage;
