const CommandSuccess = () => {
  return (
    <>
      <h1 className="cart__title">Command succed!</h1>
      <div className="cart__container">
        <section className="cart__successSummary">
          <div className="cart__successDiv">
            <h2 className="cart__successHead">Thank you for your purchase!</h2>
            <p>
              Your order has been registered under the number XXXXXXXXXX. You
              can follow its status from your customer area.
            </p>
          </div>
        </section>
        <section className="cart__successRight">
          <button type="submit" className="cart__button">
            Continue shopping
          </button>
        </section>
      </div>
    </>
  );
};

export default CommandSuccess;
