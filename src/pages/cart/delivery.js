const Checkout = () => {
  return (
    <>
      <h1 className="cartTitle">Delivery</h1>
      <form>
        <div className="cartContainer">
          <section className="cartDeliverySummary">
            <div className="cartDeliveryForm">
              <div className="cartDeliveryRow">
                <label htmlFor="gender">
                  <span className="">Gender*</span>
                  <input name="gender" type="text" required />
                </label>
                <label htmlFor="firstName">
                  <span className="">First name*</span>
                  <input name="firstName" type="text" required />
                </label>
                <label htmlFor="lastName">
                  <span className="">Last name*</span>
                  <input name="lastName" type="text" required />
                </label>
              </div>
              <div className="cartDeliveryRow">
                <label htmlFor="addressOne">
                  <span>Address 1*</span>
                  <input name="addressOne" type="text" required />
                </label>
              </div>
              <div className="cartDeliveryRow">
                <label htmlFor="addressTwo">
                  <span>Address 2</span>
                  <input name="addressTwo" type="text" />
                </label>
              </div>
              <div className="cartDeliveryRow">
                <label htmlFor="postCode">
                  <span>Post code*</span>
                  <input name="postCode" type="text" required />
                </label>
                <label htmlFor="city">
                  <span>City*</span>
                  <input name="city" type="text" required />
                </label>
              </div>
              <div className="cartDeliveryRow">
                <label htmlFor="phoneNumber">
                  <span>Phone number*</span>
                  +33 <input name="phoneNumber" type="text" required />
                </label>
              </div>
            </div>
          </section>
          <section className="cartTotal">
            <button className="cartButtonSubmit">Place the payment</button>
          </section>
        </div>
      </form>
    </>
  );
};

export default Checkout;
