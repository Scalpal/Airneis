import Carousel from "@/web/components/Carousel";
import CustomerReview from "@/web/components/CustomerReview";
import CategoriesBlocks from "@/web/components/CategoriesBlocks";
import styles from "@/styles/home.module.css";
import ProductCard from "@/web/components/ProductCard";
import routes from "@/web/routes";
import SeeMoreButton from "@/web/components/SeeMoreButton";
import { createQueryString } from "@/web/services/createQueryString";
import Axios from "axios";
import Head from "next/head";

const reviews = [
  {
    review:
      "My experience with Mark is a complete sucess, from customer service, wide range of products, clean store, purchasing experience, the newsletter. Thank you.",
    customerName: "Leona Paul",
  },
];


export const getServerSideProps = async () => {
  const carouselQueryString = createQueryString({ visible: true });
  const productsQueryString = createQueryString({ showInHome: true });
  const categoriesQueryString = createQueryString({ visibleInHome: true });

  const carouselUrl = process.env.API_URL + routes.api.images.homeCarousel.base(carouselQueryString);
  const popularProductsUrl = process.env.API_URL + routes.api.products.collection(productsQueryString);
  const categoriesUrl = process.env.API_URL + routes.api.categories.base(categoriesQueryString);

  try {
    const responseCarousel = await Axios.get(carouselUrl);
    const { data: { products } } = await Axios.get(popularProductsUrl);
    const { data : { categories }} = await Axios.get(categoriesUrl);

    return {
      props: {
        carouselImages: responseCarousel.data.images,
        popularProducts: products,
        categories: categories
      }
    };
  } catch (error) {
    return {
      props: {
        carouselImages: [],
        popularProducts: [],
        categories: []
      }
    };
  }
};
 
const Home = (props) => {
  const { carouselImages, popularProducts, categories } = props;

  return (
    <>
       <Head>
        <title>Airneis - Home</title>
      </Head>     

      <header className="fullWidthCarousel" id="carousel">
        <Carousel images={carouselImages} Autoplay={true} controls={false} />
      </header>

      {/* Popular products block */}
      <section className={styles.popularProductsContainer}>
        <h1 className={styles.popularProductsTitle}> Popular products </h1>

        <div className={styles.popularProductsList}>
          {popularProducts.map((product, index) => {
            return <ProductCard key={index} product={product} />;
          })}
        </div>

        <SeeMoreButton route={routes.products.base()}>
          See more products
        </SeeMoreButton>
      </section>

      {/* Categories block */}
      <section className={styles.categoriesContainer}>
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

export default Home;
