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

const Cart = () => {
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
        <title>Airneis - Cart</title>
      </Head>

      <div className={styles.mainContent}>
        {productsList.length === 0 ? (
          <>
            <section className={styles.emptyCartContainer}>
              <ShoppingCartIcon className={styles.emptyCartIcon} />

              <p className={styles.emptyCartTitle}>
                Your cart is currently empty{" "}
              </p>

              <div className={styles.emptyCartText}>
                <p>
                  Before proceed to checkout, you must add some products to your
                  cart.
                </p>
                <p>Won&apos;t you come here without buying anything...</p>
              </div>

              <div>
                <Button onClick={() => redirectToHomePage()}>
                  Return to shop
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
                  <p>Subtotal</p>
                  <p>{totalSum.toFixed(2)}€</p>
                </div>

                <div className={styles.recapRow}>
                  <p>TAX (20%)</p>
                  <p>{(totalSum * 0.2).toFixed(2)}€</p>
                </div>
              </div>

              <div className={styles.recapTotalRow}>
                <p>TOTAL</p>
                <p>{(totalSum * 1.2).toFixed(2)}€</p>
              </div>

              <Button onClick={() => handleSubmit()}>Order</Button>
            </section>
          </>
        )}
      </div>
    </>
  );
};

Cart.getLayout = function (page) {
  return <LayoutStickyNavbar>{page}</LayoutStickyNavbar>;
};

export default Cart;
