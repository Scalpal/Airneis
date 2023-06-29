import Banner from "@/web/components/Banner";
import DetailedProductCard from "@/web/components/DetailedProductCard";
import { useRouter } from "next/router";
import styles from "@/styles/categoryPage.module.css";
import useGetProducts from "@/web/hooks/useGetProducts";
import { useCallback } from "react";
import Loader from "@/web/components/Loader";
import Button from "@/web/components/Button";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps = async (context) => {
  const { categoryId } = context.query;
  const locale = context.locale;

  return {
    props: {
      categoryId: Number.parseInt(categoryId),
      ...(await serverSideTranslations(locale, [
        "categoryPage",
        "footer",
        "drawerMenu",
        "navbar",
      ])),
    },
  };
};

const Category = (props) => {
  const { t } = useTranslation("categoryPage");
  const { categoryId } = props;
  const router = useRouter();

  const { data, isLoading, isValidating, size, setSize } = useGetProducts({
    categories: categoryId,
    limit: 3,
  });
  const products = data
    ? data.reduce((acc, { products }) => [...acc, ...products], [])
    : [];
  const totalPages = data && data[0] ? Math.ceil(data[0].count / 3) : 0;
  const isEndReached = size === totalPages;

  const handleLoadMore = useCallback(() => {
    setSize((previousSize) => previousSize + 1);
  }, [setSize]);

  return (
    <>
      <Banner title={router.query.categoryName} />

      <main>
        <p className={styles.descriptionText}>{t("categoryText")}</p>

        <div className={styles.productsList}>
          {products.map((product, index) => {
            return <DetailedProductCard key={index} product={product} />;
          })}
        </div>

        <div className={styles.buttonWrapper}>
          <span className={styles.emptySpace}></span>
          {!isLoading &&
            products.length > 0 &&
            (isEndReached ? (
              <p>{t("noMoreProducts")}</p>
            ) : (
              <>
                {isValidating ? (
                  <Loader />
                ) : (
                  <Button onClick={() => handleLoadMore()}>
                    {t("seeMoreButton")}
                  </Button>
                )}
              </>
            ))}
        </div>
      </main>
    </>
  );
};

export default Category;
