const Payment = () => {
  return (
    <>
      <h1 className="cartTitle">Payment</h1>
      <form>
        <div className="cartContainer">
          <section className="cartPaymentSummary">
            <div className="cartDeliveryForm">
              <div className="cartDeliveryRow">
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
              <div className="cartDeliveryRow">
                <label htmlFor="cardName">
                  <span>Card name*</span>
                  <input name="cardName" type="text" required />
                </label>
              </div>
              <div className="cartDeliveryRow">
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
          <section className="cartTotal">
            <button type="submit" className="cartButtonSubmit">
              Proceed to payment
            </button>
          </section>
        </div>
      </form>
    </>
  );
};

export default Payment;