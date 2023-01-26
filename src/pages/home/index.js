import Banner from "@/components/Banner";
import ProductCard from "@/components/ProductCard";
import CustomerReview from "@/components/CustomerReview";
import { useRouter } from "next/router";

const Home = () => {

  const router = useRouter();

  const products = [
    {
      name: "chaise",
      type: "bois",
      price: "145$"
    },
    {
      name: "table",
      type: "chêne",
      price: "105$"
    },
    {
      name: "rideau",
      type: "laine",
      price: "45$"
    },
    {
      name: "rideau",
      type: "laine",
      price: "45$"
    },
    {
      name: "rideau",
      type: "laine",
      price: "45$"
    },
    {
      name: "rideau",
      type: "laine",
      price: "45$"
    },
    {
      name: "rideau",
      type: "laine",
      price: "45$"
    },
    {
      name: "rideau",
      type: "laine",
      price: "45$"
    },
    {
      name: "rideau",
      type: "laine",
      price: "45$"
    }
  ];

  const reviews = [
    {
      review: "My experience with Mark is a complete sucess, from customer service, wide range of products, clean store, purchasing experience, the newsletter. Thank you.",
      customerName: "Leona Paul",  
    }
  ]

  return (
    <>
      <Banner />

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

        <div
          className="categories__container"
        >
          <div
            onClick={() => { router.push("/category/moderne")}}
          >
            <p>Moderne</p>
          </div>

          <div>
            <p>Chaises</p>
          </div>

          <div>
            <p>Tables</p>
          </div>

          <div>
            <p>Appartements</p>
          </div>    
          
          <div>
            <p>Maison</p>
          </div>

          <div>
            <p>Vintage</p>
          </div>

        </div>
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