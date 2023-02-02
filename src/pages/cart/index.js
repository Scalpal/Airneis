import ProductCart from "@/components/cart/ProductCart";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

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
    picture: "",
    name: "Product #2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae nibh pulvinar, scelerisque nunc id, accumsan augue. Cras placerat sem id est suscipit, sit amet venenatis ante mollis. Phasellus rutrum ex id semper elementum. Proin lobortis neque sem, in iaculis est efficitur id. Fusce ornare volutpat arcu, quis imperdiet quam.",
    price: 75.25,
    quantity: 1,
  },
  {
    id: 3,
    picture: "",
    name: "Product #3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae nibh pulvinar, scelerisque nunc id, accumsan augue. Cras placerat sem id est suscipit, sit amet venenatis ante mollis. Phasellus rutrum ex id semper elementum. Proin lobortis neque sem, in iaculis est efficitur id. Fusce ornare volutpat arcu, quis imperdiet quam.",
    price: 10.99,
    quantity: 1,
  },
];

const Cart = () => {
  const router = useRouter();
  const [totalSum, setTotalSum] = useState(
    products.reduce((x, product) => x + product.price * product.quantity, 0.0)
  );
  const [productsLists, setProductsLists] = useState(products);

  const handleSubmit = useCallback(() => {
    router.push("/order/delivery");
  }, [router]);

  const handleDelete = (e) => {
    const productId = Number.parseInt(
      e.currentTarget.getAttribute("data-product-id")
    );
    const product = productsLists.find((product) => product.id === productId);
    setTotalSum(totalSum - product.price * product.quantity);
    setProductsLists(
      productsLists.filter((product) => product.id !== productId)
    );
  };

  const handlePlus = (e) => {
    const productId = Number.parseInt(
      e.currentTarget.getAttribute("data-product-id")
    );
    const product = productsLists.find((product) => product.id === productId);
    if (product.quantity < 99) {
      product.quantity++;
      setTotalSum(totalSum + product.price);
    }
  };

  const handleMinus = (e) => {
    const productId = Number.parseInt(
      e.currentTarget.getAttribute("data-product-id")
    );
    const product = productsLists.find((product) => product.id === productId);
    if (product.quantity > 1) {
      product.quantity--;
      setTotalSum(totalSum - product.price);
    }
  };

  return (
    <>
      <h1 className="cartTitle">Cart</h1>
      <Formik onSubmit={handleSubmit}>
        <Form className="cartContainer">
          <section className="cartProductList">
            <ProductCart
              productsLists={productsLists}
              handleDelete={handleDelete}
              handlePlus={handlePlus}
              handleMinus={handleMinus}
            />
          </section>
          <section className="cartProductTotal">
            <div className="cartProductTotalSummary">
              <div className="cartProductTotalRow">
                <p className="cartProductTotalTitleVat">Excl. tax</p>
                <p className="cartProductTotalQuantityVat">
                  {`${Number.parseFloat(totalSum).toFixed(2)} €`}
                </p>
              </div>
              <div className="cartProductTotalRow">
                <p className="cartProductTotalTitleVat">VAT</p>
                <p className="cartProductTotalQuantityVat">20%</p>
              </div>
              <div className="cartProductTotalRow">
                <p className="cartProductTotalTitle">TOTAL</p>
                <p className="cartProductTotalQuantity">
                  {`${Number.parseFloat(totalSum * 1.2).toFixed(2)} €`}
                </p>
              </div>
            </div>
            <button className="cartButtonSubmit" type="submit">
              Place the order
            </button>
          </section>
        </Form>
      </Formik>
    </>
  );
};

export default Cart;
