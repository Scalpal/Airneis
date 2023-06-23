import { useTranslation } from "next-i18next";
const Delivery = () => {
  const { t: translate } = useTranslation("delivery");
  const { t: translate } = useTranslation("delivery");

  return (
    <>
      <h1 className="cartTitle">{translate("cartTitle")}</h1>
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
                  <span className="">{translate("firstName")}*</span>
                  <input name="firstName" type="text" required />
                </label>
                <label htmlFor="lastName">
                  <span className="">{translate("lastName")}</span>
                  <input name="lastName" type="text" required />
                </label>
              </div>
              <div className="cartDeliveryRow">
                <label htmlFor="addressOne">
                  <span>{translate("address")}</span>
                  <input name="addressOne" type="text" required />
                </label>
              </div>
              <div className="cartDeliveryRow">
                <label htmlFor="addressTwo">
                  <span>{translate("complementaryAddress")}</span>
                  <input name="addressTwo" type="text" />
                </label>
              </div>
              <div className="cartDeliveryRow">
                <label htmlFor="postCode">
                  <span>{translate("postCode")}</span>
                  <input name="postCode" type="text" required />
                </label>
                <label htmlFor="city">
                  <span>{translate("city")}</span>
                  <input name="city" type="text" required />
                </label>
              </div>
              <div className="cartDeliveryRow">
                <label htmlFor="phoneNumber">
                  <span>{translate("phoneNumber")}</span>
                  +33 <input name="phoneNumber" type="text" required />
                </label>
              </div>
            </div>
          </section>
          <section className="cartTotal">
            <button className="cartButtonSubmit">
              {translate("cartButtonPayment")}
            </button>
          </section>
        </div>
      </form>
    </>
  );
};

export default Delivery;
