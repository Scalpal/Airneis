import Carousel from "@/web/components/Carousel";
import CustomerReview from "@/web/components/CustomerReview";
import CategoriesBlocks from "@/web/components/CategoriesBlocks";
import styles from "@/styles/home.module.css";
import ProductCard from "@/web/components/ProductCard";
import routes from "@/web/routes";
import SeeMoreButton from "@/web/components/SeeMoreButton";
import { createQueryString } from "@/web/services/createQueryString";
import Axios from "axios";
import { useGetCategories } from "@/web/hooks/useGetCategories";
import useGetProductsSWR from "@/web/hooks/useGetProductsSWR";

const reviews = [
  {
    review:
      "My experience with Mark is a complete sucess, from customer service, wide range of products, clean store, purchasing experience, the newsletter. Thank you.",
    customerName: "Leona Paul",
  },
];


export const getServerSideProps = async () => {
  const queryString = createQueryString({ visible: true });

  const url = process.env.API_URL + routes.api.images.homeCarousel.base(queryString);

  try {
    const { data } = await Axios.get(url);

    return {
      props: {
        carouselImages: data.images
      }
    };
  } catch (error) {
    return {
      props: {
        carouselImages: []
      }
    };
  }
};
 
const Home = (props) => {
  const { carouselImages } = props;

  const productsQueryParams = {
    showInHome: true
  };
  const { productsData, productsError, productsIsLoading } = useGetProductsSWR(productsQueryParams);
  const products = (!productsError && !productsIsLoading) ? productsData.products : []; 

  const { categoriesData, categoriesError, categoriesIsLoading } = useGetCategories({ visibleInHome: true });
  const categories = (!categoriesError && !categoriesIsLoading) ? categoriesData : [];
 
  return (
    <>
      <header className="fullWidthCarousel" id="carousel">
        <Carousel images={carouselImages} Autoplay={true} controls={false} />
      </header>

      {/* Popular products block */}
      <section className={styles.popularProductsContainer}>
        <h1 className={styles.popularProductsTitle}> Popular products </h1>

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
