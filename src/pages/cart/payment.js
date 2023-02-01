const Payment = () => {
  return (
    <>
      <h1 className="cart__title">Payment</h1>
      <form>
        <div className="cart__container">
          <section className="cart__summary">
            <div className="cart__deliveryForm">
              <div className="cart__deliveryRow">
                <label htmlFor="cardNumber">
                  <span className="">Card number*</span>
                  <input
                    name="cardNumber"
                    type="text"
                    maxLength="16"
                    required
                  />
                </label>
              </div>
              <div className="cart__deliveryRow">
                <label htmlFor="cardName">
                  <span>Card name*</span>
                  <input name="cardName" type="text" required />
                </label>
              </div>
              <div className="cart__deliveryRow">
                <label htmlFor="expDate">
                  <span>Expiration date*</span>
                  <input name="expDate" type="date" required />
                </label>
                <label htmlFor="cvv">
                  <span>CVV*</span>
                  <input name="cvv" type="text" maxLength="3" required />
                </label>
              </div>
            </div>
          </section>
          <section className="cart__total">
            <button type="submit" className="cart__button">
              Proceed to payment
            </button>
          </section>
        </div>
      </form>
    </>
  );
};

export default Payment;
