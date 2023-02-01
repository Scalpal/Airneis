import CarouselBanner from "@/components/CarouselBanner";
import ProductCard from "@/components/ProductCard";
import CustomerReview from "@/components/CustomerReview";
// import { useRouter } from "next/router";
import CategoriesBlocks from "@/components/CategoriesBlocks";

const Home = () => {

  // const router = useRouter();

  const products = [
    {
      id: 1, 
      name: "Chaise moderne en bois de hêtre",
      type: "bois",
      price: "145$", 
      stock: 25,
      imageSrc: "/meuble-2.jpeg"
    },
    {
      id: 2, 
      name: "chaise",
      type: "bois",
      price: "145$", 
      stock: 25,
      imageSrc: "/meuble-2.jpeg"
    },
    {
      id: 3, 
      name: "chaise",
      type: "bois",
      price: "145$", 
      stock: 25,
      imageSrc: "/meuble-2.jpeg"
    },
    {
      id: 4, 
      name: "chaise",
      type: "bois",
      price: "145$", 
      stock: 25,
      imageSrc: "/meuble-2.jpeg"
    },
    {
      id: 5, 
      name: "chaise",
      type: "bois",
      price: "145$", 
      stock: 25,
      imageSrc: "/meuble-2.jpeg"
    },
    {
      id: 6, 
      name: "chaise",
      type: "bois",
      price: "145$", 
      stock: 25,
      imageSrc: "/meuble-2.jpeg"
    }
  ];

  const reviews = [
    {
      review: "My experience with Mark is a complete sucess, from customer service, wide range of products, clean store, purchasing experience, the newsletter. Thank you.",
      customerName: "Leona Paul",
    }
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
    }
  ];



  return (
    <>
      <CarouselBanner />

      {/* Popular products block */}
      <section>  
        <h1 className="popular-products__title"> Popular products </h1>

        <div
          className="popular-products__list"
        >
          {products.map((product , index) => {
            return (
              <ProductCard
                key={index}
                product={product}
              />
            );
          })}
        </div>

        <button className="popular-products__button"> See more products </button>
      </section>

      
      {/* Categories block */}
      <section>
        <h1 className="categories__title"> Explore by category </h1>

        <CategoriesBlocks categories={categories} />
      </section>


      {/* Customer reviews block */}
      <section className="customer-reviews-container">
        <h1>Customers reviews</h1>

        <h2>Our happy customers</h2>

        <div> 
          {reviews.map((review, index ) => {
            return (
              <CustomerReview key={index} review={review} />
            );
          })}
        </div>

      </section>
    </>
  );
};

export default Home;