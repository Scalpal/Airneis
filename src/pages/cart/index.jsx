import Button from "@/web/components/Button";
import CartProduct from "@/web/components/CartProduct";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import LayoutStickyNavbar from "@/web/components/LayoutStickyNavbar";
import styles from "@/styles/cart.module.css";

const products = [
  {
    id: 1,
    picture: "/meuble-1.jpeg",
    name: "Product #1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae nibh pulvinar, scelerisque nunc id, accumsan augue. Cras placerat sem id est suscipit, sit amet venenatis ante mollis. Phasellus rutrum ex id semper elementum. Proin lobortis neque sem, in iaculis est efficitur id. Fusce ornare volutpat arcu, quis imperdiet quam.",
    price: 50.0,
    quantity: 1,
  },
  {
    id: 2,
    picture: "/meuble-2.jpeg",
    name: "Product #2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae nibh pulvinar, scelerisque nunc id, accumsan augue. Cras placerat sem id est suscipit, sit amet venenatis ante mollis. Phasellus rutrum ex id semper elementum. Proin lobortis neque sem, in iaculis est efficitur id. Fusce ornare volutpat arcu, quis imperdiet quam.",
    price: 75.25,
    quantity: 1,
  },
  {
    id: 3,
    picture: "/meuble-3.png",
    name: "Product #3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae nibh pulvinar, scelerisque nunc id, accumsan augue. Cras placerat sem id est suscipit, sit amet venenatis ante mollis. Phasellus rutrum ex id semper elementum. Proin lobortis neque sem, in iaculis est efficitur id. Fusce ornare volutpat arcu, quis imperdiet quam.",
    price: 10.99,
    quantity: 1,
  },
];


const Cart = () => {
  const router = useRouter();
  const [productsList, setProductsList] = useState(products);
  const [totalSum, setTotalSum] = useState(
    productsList.reduce(
      (x, product) => x + product.price * product.quantity,
      0.0
    )
  );

  const handleSubmit = useCallback(() => {
    router.push("/order/delivery");
  }, [router]);

  const redirectToHomePage = useCallback(() => {
    router.push("/home");
  }, [router]);


  return (
    <>
      <div className={styles.mainContent}>
        {productsList.length === 0 ? (
          <>
            <section className={styles.emptyCartContainer}>
              <ShoppingCartIcon className={styles.emptyCartIcon} />

              <p className={styles.emptyCartTitle}>Your cart is currently empty </p>

              <div className={styles.emptyCartText}>
                <p>Before proceed to checkout, you must add some products to your cart.</p>
                <p>Won&apos;t you come here without buying anything...</p>
              </div>

              <div>
                <Button
                  onClick={() => redirectToHomePage()}
                >
                  Return to shop
                </Button>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className={styles.productListContainer}>
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
                <p>
                  {(totalSum * 1.2).toFixed(2)}€
                </p>
              </div>

              <Button
                onClick={() => handleSubmit()}
              >
                Order
              </Button>
            </section>
          </>
        )}
      </div>
    </>
  );
};
Cart.isPublic = true
Cart.getLayout = function (page) {
  return (
    <LayoutStickyNavbar>
      {page}
    </LayoutStickyNavbar>
  );
};

export default Cart;
