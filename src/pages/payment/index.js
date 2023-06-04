import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Payment = () => {
  const { t: translate } = useTranslation("payment");

  return (
    <>
      <h1 className="cartTitle">{translate("paymentTitle")}</h1>
      <form>
        <div className="cartContainer">
          <section className="cartPaymentSummary">
            <div className="cartDeliveryForm">
              <div className="cartDeliveryRow">
                <label htmlFor="cardNumber">
                  <span className="">{translate("cartNumber")}</span>
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
                  <span>{translate("cardName")}</span>
                  <input name="cardName" type="text" required />
                </label>
              </div>
              <div className="cartDeliveryRow">
                <label htmlFor="expDate">
                  <span>{translate("expirationDate")}</span>
                  <input name="expDate" type="date" required />
                </label>
                <label htmlFor="cvv">
                  <span>{translate("cvv")}</span>
                  <input name="cvv" type="text" maxLength="3" required />
                </label>
              </div>
            </div>
          </section>
          <section className="cartTotal">
            <button type="submit" className="cartButtonSubmit">
              {translate("paymentButton")}
            </button>
          </section>
        </div>
      </form>
    </>
  )
}
Payment.isPublic = false
export default Payment
