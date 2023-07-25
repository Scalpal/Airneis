import Banner from "@/web/components/Banner";
import DetailedProductCard from "@/web/components/DetailedProductCard";
import styles from "@/styles/categoryPage.module.css";
import useGetProducts from "@/web/hooks/useGetProducts";
import { useCallback } from "react";
import Loader from "@/web/components/Loader";
import Button from "@/web/components/Button";
import Head from "next/head";
import Axios from "axios";
import routes from "@/web/routes";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const limit = 10;

export const getServerSideProps = async (context) => {
  const { categorySlug } = context.query;
  const locale = context.locale;

  const url = `${process.env.API_URL}${routes.api.categories.single(categorySlug)}`;

  try {
    const { data } = await Axios.get(url);

    return {
      props: {
        categoryProps: data,
        ...(await serverSideTranslations(locale, [
          "footer",
          "drawerMenu",
          "productSearchBar",
          "searchProductOverlay",
          "navbar"
        ]))
      }
    };
  } catch (error) {
    return {
      props: {
        category: { id: 1 }
      }
    };
  }
};

const Category = (props) => {
  const { categoryProps: { category } } = props;

  const { data, isLoading, isValidating, size, setSize } = useGetProducts({ categories: category.id, limit: limit });
  const products = data ? data.reduce((acc, { products }) => [...acc, ...products], []) : [];
  const totalPages = data && data[0] ? Math.ceil(data[0].count / limit ) : 0;
  const isEndReached = size === totalPages;

  const handleLoadMore = useCallback(() => {
    setSize((previousSize) => previousSize + 1);
  }, [setSize]);

  return (
    <>
      <Head>
        <title>Airneis - {category.name}</title>
        <meta key={"Specific category head"} />
      </Head>

      <Banner title={category.name} image={category.imageUrl} />

      <main>
        <p className={styles.descriptionText}>{category.description}</p>

        <div className={styles.productsList}>
          {products.map((product, index) => {
            return <DetailedProductCard key={index} product={product} />;
          })}
        </div>

        <div className={styles.buttonWrapper}>
          <span className={styles.emptySpace}></span>
          {(!isLoading && products.length > 0) && (
            isEndReached ? (
              <p>No more products</p>
            ) : (
              <>
                {isValidating ? (
                  <Loader />
                ) : (
                  <Button onClick={() => handleLoadMore()}>See more</Button>
                )}
              </>
            ))}
        </div>
      </main>
    </>
  );
};

export default Category;
