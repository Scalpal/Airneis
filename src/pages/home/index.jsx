import Carousel from "@/web/components/Carousel";
import CustomerReview from "@/web/components/CustomerReview";
import CategoriesBlocks from "@/web/components/CategoriesBlocks";
import styles from "@/styles/home.module.css";
import ProductCard from "@/web/components/ProductCard";


const placeholderImages = [
  "/meuble-4.jpeg",
  "/meuble-2.jpeg",
  "/meuble-3.png",
];

const products = [
  {
    id: 1,
    name: "Chaise moderne en bois de hêtre",
    type: "bois",
    price: "145$",
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
  {
    id: 2,
    name: "chaise",
    type: "bois",
    price: "145$",
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
  {
    id: 3,
    name: "chaise",
    type: "bois",
    price: "145$",
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
  {
    id: 4,
    name: "chaise",
    type: "bois",
    price: "145$",
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
  {
    id: 5,
    name: "chaise",
    type: "bois",
    price: "145$",
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
  {
    id: 6,
    name: "chaise",
    type: "bois",
    price: "145$",
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
  {
    name: "Moderne",
  },
  {
    name: "Vintage",
  },
  {
    name: "Chaises",
  },
  {
    name: "Contemporain",
  },
  {
    name: "Artisanal",
  },
  {
    name: "Bois",
  },
];

const Home = () => {

  return (
    <>
      <header className="fullWidthCarousel" id="carousel">
        <Carousel images={placeholderImages} Autoplay={true} controls={false} />
      </header>

      {/* Popular products block */}
      <section>
        <h1 className={styles.popularProductsTitle}> Popular products </h1>

        <div className={styles.popularProductsList}>
          {products.map((product, index) => {
            return <ProductCard key={index} product={product} />;
          })}
        </div>

        <button className={styles.popularProductsButton}>
          {" "}
          See more products{" "}
        </button>
      </section>

      {/* Categories block */}
      <section>
        <h1 className={styles.categoriesTitle}> Explore by category </h1>

        <CategoriesBlocks categories={categories} />
      </section>

      {/* Customer reviews block */}
      <section className={styles.customerReviewsContainer}>
        <h1>Customers reviews</h1>

        <h2>Our happy customers</h2>

        <div>
          {reviews.map((review, index) => {
            return <CustomerReview key={index} review={review} />;
          })}
        </div>
      </section>
    </>
  );
};
Home.isPublic = true;
export default Home;
