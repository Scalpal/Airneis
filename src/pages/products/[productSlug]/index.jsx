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
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps = async (context) => {
  const { productSlug } = context.query;

  const {
    data: { product },
  } = await Axios.get(
    `${process.env.API_URL}${routes.api.products.single(productSlug)}`
  );

  const specificCategory = `?categories=${Number.parseInt(
    product.category.id
  )}&`;
  const {
    data: { products },
  } = await Axios.get(
    `${process.env.API_URL}${routes.api.products.collection(
      specificCategory,
      1
    )}`
  );

  const locale = context.locale;

  return {
    props: {
      product: product,
      categoryProducts: products,
      ...(await serverSideTranslations(locale, [
        "productPage",
        "footer",
        "drawerMenu",
        "navbar",
      ])),
    },
  };
};

const ProductPage = (props) => {
  const { t } = useTranslation(["productPage"]);

  const { product, categoryProducts } = props;

  const {
    actions: { addToCart },
  } = useAppContext();
  const [limit] = useState(4);
  const [page, setPage] = useState(1);

  return (
    <>
      <Head>
        <title>Airneis - {product.name}</title>
      </Head>

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
              <p className={styles.productInfosDescription}>
                {product.description}
              </p>
            </div>

            <div className={styles.productInfosBottomBlock}>
              <p className={styles.productInfosMaterials}>
                Materials :{" "}
                {product.materials.map(({ name }, index) => {
                  const dash = index < product.materials.length - 1 ? "-" : "";

                  return name + " " + dash + " ";
                })}
              </p>

              <div className={styles.productInfosStockPrice}>
                <p className={styles.productInfosPrice}>{product.price}€</p>
                <p>
                  {product.stock > 0
                    ? "Stocks : " + product.stock + " available"
                    : "Out of stock"}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.addToCartBtnWrapper} id="productReviewAnchor">
          <Button onClick={() => addToCart(product)}>
            {t("addToCartButton")}
          </Button>
        </div>

        <ProductReviews
          productSlug={product.slug}
          page={page}
          setPage={setPage}
          limit={limit}
        />

        <div className={styles.titleWrapper}>
          <div className={styles.line}></div>
          <p className={styles.title}>{t("similiarProductTitle")}</p>
          <div className={styles.line}></div>
        </div>

        <section className={styles.similarProductsWrapper}>
          <div className={styles.similarProductsContainer}>
            {categoryProducts.map((product, index) => {
              return <ProductCard key={index} product={product} />;
            })}
          </div>

          <SeeMoreButton route={routes.products.base()}>
            {t("viewAllProductButton")}
          </SeeMoreButton>
        </section>
      </main>
    </>
  );
};

export default ProductPage;
