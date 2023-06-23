import { useTranslation } from "next-i18next";

const OrderConfirmation = () => {
  const { t: translate } = useTranslation("orderConfirmation");

  return (
    <>
      <h1 className="cartTitle">{translate("succedCommandTitle")}</h1>
      <div className="cartContainer">
        <section className="cartSuccessSummary">
          <div className="cartSuccessDiv">
            <h2 className="cartSuccessHead">
              {translate("succedCommandHead")}
            </h2>
            <p>{translate("succedCommandText")}</p>
          </div>
        </section>
        <section className="cartSuccessRight">
          <button type="submit" className="cartButtonSubmit">
            {translate("returnButtonContinueShopping")}
          </button>
        </section>
      </div>
    </>
  );
};

export default OrderConfirmation;
