const OrderConfirmation = () => {
  return (
    <>
      <h1 className="cartTitle">Command succed!</h1>
      <div className="cartContainer">
        <section className="cartSuccessSummary">
          <div className="cartSuccessDiv">
            <h2 className="cartSuccessHead">Thank you for your purchase!</h2>
            <p>
              Your order has been registered under the number XXXXXXXXXX. You
              can follow its status from your customer area.
            </p>
          </div>
        </section>
        <section className="cartSuccessRight">
          <button type="submit" className="cartButtonSubmit">
            Continue shopping
          </button>
        </section>
      </div>
    </>
  );
};
OrderConfirmation.isPublic = false;
export default OrderConfirmation;
