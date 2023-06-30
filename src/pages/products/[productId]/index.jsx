import Carousel from "@/web/components/Carousel";
import ProductCard from "@/web/components/ProductCard";
import Banner from "@/web/components/Banner";
import Button from "@/web/components/Button";
import styles from "@/styles/productPage.module.css";
import Axios from "axios";
import routes from "@/web/routes";
import useAppContext from "@/web/hooks/useAppContext";
import SeeMoreButton from "@/web/components/SeeMoreButton";
import ProductReviews from "@/web/components/ProductReviews";
import { useState } from "react"; 

export const getServerSideProps = async (context) => {
  const { productId } = context.query;  

  const { data: { product } } = await Axios.get(`${process.env.API_URL}${routes.api.products.single(productId)}`); 

  const specificCategory = `?categories=${Number.parseInt(product.category.id)}&`;
  const { data: { products } } = await Axios.get(`${process.env.API_URL}${routes.api.products.collection(specificCategory, 1)}`);

  return ({
    props: {
      product: product,
      categoryProducts: products
    }
  }); 
};

const ProductPage = (props) => {
  const { product, categoryProducts } = props;

  const { actions: { addToCart } } = useAppContext(); 
  const [limit] = useState(4);
  const [page, setPage] = useState(1); 


  return (
    <>
      <Banner title={product.name} />

      <main>
        <section className={styles.mainContent}>
          <div className={styles.productCarousel}>
            <Carousel
              images={product.productImages}
              Autoplay={false}
              controls={true}
            />
          </div>

          <div className={styles.productInfos}>
            <div className={styles.productInfosTopBlock}>
              <h1 className={styles.productInfosName}>{product.name}</h1>
              <p className={styles.productInfosDescription}>{product.description}</p>
            </div>


            <div className={styles.productInfosBottomBlock}>
              <p className={styles.productInfosMaterials}>
                Materials : {product.materials.map(({ name }, index) => {
                  const dash = index < product.materials.length - 1 ? "-" : "";
                  
                  return name + " " + dash + " ";
                })}
              </p>

              <div className={styles.productInfosStockPrice}>
                <p className={styles.productInfosPrice}>{product.price}€</p>
                <p>
                  {product.stock > 0 ? ("Stocks : " + product.stock + " available") : ("Out of stock")}
                </p>
              </div>
            </div>

          </div>
        </section>

        <div className={styles.addToCartBtnWrapper} id="productReviewAnchor">
          <Button
            onClick={() => addToCart(product)}
          >
            Add to cart
          </Button>
        </div>

        <ProductReviews
          productId={product.id}
          page={page}
          setPage={setPage}
          limit={limit}
        />

        <div className={styles.titleWrapper}>
          <div className={styles.line}></div>
          <p className={styles.title}>Similar products</p>
          <div className={styles.line}></div>
        </div>

        <section className={styles.similarProductsWrapper}>

          <div className={styles.similarProductsContainer}>
            {categoryProducts.map((product, index) => {
              return <ProductCard key={index} product={product} />;
            })}
          </div>

          <SeeMoreButton route={routes.products.base()}>
            View all products
          </SeeMoreButton>

        </section>

      </main>
    </>
  );
};


export default ProductPage;