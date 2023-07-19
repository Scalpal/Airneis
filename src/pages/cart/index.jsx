import Button from "@/web/components/Button";
import CartProduct from "@/web/components/CartProduct";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import LayoutStickyNavbar from "@/web/components/LayoutStickyNavbar";
import styles from "@/styles/cart.module.css";
import useAppContext from "@/web/hooks/useAppContext";
import routes from "@/web/routes";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
const Cart = () => {
  const { t } = useTranslation("cart");
  const router = useRouter();
  const {
    state: { cart }
  } = useAppContext();

  const [productsList, setProductsList] = useState([]);
  const [totalSum, setTotalSum] = useState(0);

  useEffect(() => {
    setProductsList(cart);
  }, [cart]);

  useEffect(() => {
    setTotalSum(
      productsList.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0.0
      )
    );
  }, [productsList]);

  const handleSubmit = useCallback(() => {
    router.push("/order/delivery");
  }, [router]);

  const redirectToHomePage = useCallback(() => {
    router.push(routes.home());
  }, [router]);

  return (
    <>
      <Head>
        <title>{t("emptyCartHeadTitle")}</title>
      </Head>

      <div className={styles.mainContent}>
        {productsList.length === 0 ? (
          <>
            <section className={styles.emptyCartContainer}>
              <ShoppingCartIcon className={styles.emptyCartIcon} />

              <p className={styles.emptyCartTitle}>{t("emptyCartTitle")}</p>

              <div className={styles.emptyCartText}>
                <p>{t("emptyCartText")}</p>
                <p>{t("emptyCartTextSeconde")}</p>
              </div>

              <div>
                <Button onClick={() => redirectToHomePage()}>
                  {t("cartReturnButton")}
                </Button>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className={styles.productListContainer}>
              <p className={styles.productListTitle}>Panier</p>
              {productsList.map((product, index) => {
                return (
                  <CartProduct
                    key={index}
                    index={index}
                    product={product}
                    productState={[productsList, setProductsList]}
                    totalSumState={[totalSum, setTotalSum]}
                  />
                );
              })}
            </section>

            <section className={styles.recapContainer}>
              <div className={styles.recapTopRows}>
                <div className={styles.recapRow}>
                  <p>{t("subtotal")}</p>
                  <p>{totalSum.toFixed(2)}$</p>
                </div>

                <div className={styles.recapRow}>
                  <p>{t("tax")}</p>
                  <p>{(totalSum * 0.2).toFixed(2)}$</p>
                </div>
              </div>

              <div className={styles.recapTotalRow}>
                <p>{t("total")}</p>
                <p>{(totalSum * 1.2).toFixed(2)}$</p>
              </div>

              <Button onClick={() => handleSubmit()}>{t("order")}</Button>
            </section>
          </>
        )}
      </div>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "cart",
        "footer",
        "navbar",
        "drawerMenu"
      ]))
    }
  };
}

Cart.getLayout = function (page) {
  return <LayoutStickyNavbar>{page}</LayoutStickyNavbar>;
};

export default Cart;
