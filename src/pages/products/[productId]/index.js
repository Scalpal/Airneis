import CarouselBanner from "@/components/CarouselBanner";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ProductCard from "@/components/ProductCard";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";


const ProductPage = () => {

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

  const autoplayOptions = { delay: 5000 }; 
  const PLUGINS = [Autoplay(autoplayOptions), WheelGesturesPlugin()];
  const OPTIONS = { loop: true, stopOnMouseEnter: true }; 

  const [emblaRef] = useEmblaCarousel(OPTIONS, PLUGINS);

  return (
    <>
      <CarouselBanner />
      <main>

        <section className="productPage__infos">
          <div className="productPage__infos__slider" ref={emblaRef}>
            <div className="productPage__infos__slidesContainer">
              
              {placeholderImages.map((imageSrc, index) => {
                return (
                  <div key={index} className="productPage__infos__slidesContainer__slide">
                    <Image
                      src={imageSrc}
                      alt={"Carousel Image" + index}
                      fill
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="productPage__infos__textBlock">

            <div className="productPage__infos__textBlock__topText">
              <h1>{productPrototype.name}</h1>
              <p>{productPrototype.description}</p>
            </div>

            <div className="productPage__infos__textBlock__bottomText">
              <p>{productPrototype.price}€</p>
              <p>
                {productPrototype.stockAvailaible > 0 ? "Stocks : " + productPrototype.stockAvailaible + " available" : "Out of stock"}
              </p>
            </div>

          </div>
        </section>

        <button className="productPage__addToCartButton"> Add to cart </button>

        <section className="productPage__similarProducts">

          <h1> Similar products </h1>
          
          <div className="productPage__similarProducts__productsList">
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

export default ProductPage; 