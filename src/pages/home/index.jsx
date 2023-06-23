import Carousel from "@/web/components/Carousel";
import CustomerReview from "@/web/components/CustomerReview";
import CategoriesBlocks from "@/web/components/CategoriesBlocks";
import styles from "@/styles/home.module.css";
import ProductCard from "@/web/components/ProductCard";
import routes from "@/web/routes";
import SeeMoreButton from "@/web/components/SeeMoreButton";
import { useTranslation } from "next-i18next";

const placeholderImages = ["/meuble-4.jpeg", "/meuble-2.jpeg", "/meuble-3.png"];

const products = [
  {
    id: 1,
    name: "Modern beechwood chair",
    type: "Wood",
    price: "$145",
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
  {
    id: 2,
    name: "Chair",
    type: "Wood",
    price: "$145",
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
  {
    id: 3,
    name: "Chair",
    type: "Wood",
    price: "$145",
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
  {
    id: 4,
    name: "Chair",
    type: "Wood",
    price: "$145",
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
  {
    id: 5,
    name: "Chair",
    type: "Wood",
    price: "$145",
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
  {
    id: 6,
    name: "Chair",
    type: "Wood",
    price: "$145",
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
];

const reviews = [
  {
    review:
      "My experience with Mark is a complete sucess, from customer service, wide range of products, clean store, purchasing experience, the newsletter. Thank you.",
    customerName: "Leona Paul",
  },
];

const categories = [
  { name: "Modern" },
  { name: "Vintage" },
  { name: "Chair" },
  { name: "Contemporary" },
  { name: "Artisanal" },
  { name: "Wood" },
];

const Home = () => {
  const { t: translate } = useTranslation("common");

  return (
    <>
      <header className="fullWidthCarousel" id="carousel">
        <Carousel images={placeholderImages} Autoplay={true} controls={false} />
      </header>

      {/* Popular products block */}
      <section className={styles.popularProductsContainer}>
        <h1 className={styles.popularProductsTitle}>
          {translate("popularProducts")}
        </h1>

        <div className={styles.popularProductsList}>
          {products.map((product, index) => {
            return <ProductCard key={index} product={product} />;
          })}
        </div>

        <SeeMoreButton route={routes.products.base()}>
          See more products
        </SeeMoreButton>
      </section>

      {/* Categories block */}
      <section className={styles.categoriesContainer}>
        <h1 className={styles.categoriesTitle}>
          {translate("exploreCategory")}
        </h1>

        <CategoriesBlocks categories={categories} />
      </section>

      {/* Customer reviews block */}
      <section className={styles.customerReviewsContainer}>
        <h1>{translate("customersReviews")}</h1>

        <h2>{translate("happyCustomers")}</h2>

        <div>
          {reviews.map((review, index) => {
            return <CustomerReview key={index} review={review} />;
          })}
        </div>
      </section>
    </>
  );
};

export default Home;
