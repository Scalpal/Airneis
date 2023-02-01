import ProductCart from "@/components/cart/ProductCarT";

const Cart = () => {
  const products = [
    {
      id: 1,
      picture: "",
      name: "Product #1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae nibh pulvinar, scelerisque nunc id, accumsan augue. Cras placerat sem id est suscipit, sit amet venenatis ante mollis. Phasellus rutrum ex id semper elementum. Proin lobortis neque sem, in iaculis est efficitur id. Fusce ornare volutpat arcu, quis imperdiet quam.",
      price: 50.0,
      vat: 5.5,
      amount: 1,
    },
    {
      id: 2,
      picture: "",
      name: "Product #2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae nibh pulvinar, scelerisque nunc id, accumsan augue. Cras placerat sem id est suscipit, sit amet venenatis ante mollis. Phasellus rutrum ex id semper elementum. Proin lobortis neque sem, in iaculis est efficitur id. Fusce ornare volutpat arcu, quis imperdiet quam.",
      price: 75.25,
      vat: 5.5,
      amount: 1,
    },
    {
      id: 3,
      picture: "",
      name: "Product #3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae nibh pulvinar, scelerisque nunc id, accumsan augue. Cras placerat sem id est suscipit, sit amet venenatis ante mollis. Phasellus rutrum ex id semper elementum. Proin lobortis neque sem, in iaculis est efficitur id. Fusce ornare volutpat arcu, quis imperdiet quam.",
      price: 10.99,
      vat: 5.5,
      amount: 1,
    },
  ];

  const totalSum = products.reduce((x, product) => x + product.price, 0);

  const totalVat = products.reduce(
    (x, product) => x + (product.price / 100) * product.vat,
    totalSum
  );

  return (
    <>
      <h1 className="cart__title">Cart</h1>
      <form>
        <div className="cart__container">
          <section className="cart__productList">
            <ProductCart products={products} />
          </section>
          <section className="cart__productTotal">
            <div className="cart__productTotalSummary">
              <div className="cart__productTotalRow">
                <p className="cart__productTotalTitle">TOTAL</p>
                <p className="cart__productTotalAmount">
                  {`${Number.parseFloat(totalSum).toFixed(2)} €`}
                </p>
              </div>
              <div className="cart__productTotalRow">
                <p className="cart__productTotalTitleVat">With VAT</p>
                <p className="cart__productTotalAmountVat">
                  {`${Number.parseFloat(totalVat).toFixed(2)} €`}
                </p>
              </div>
            </div>
            <button className="cart__button">Place the order</button>
          </section>
        </div>
      </form>
    </>
  );
};

export default Cart;
