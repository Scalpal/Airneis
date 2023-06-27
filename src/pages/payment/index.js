import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Payment = () => {
  const { t } = useTranslation("payment");

  return (
    <>
      <h1 className="cartTitle">{t("paymentTitle")}</h1>
      <form>
        <div className="cartContainer">
          <section className="cartPaymentSummary">
            <div className="cartDeliveryForm">
              <div className="cartDeliveryRow">
                <label htmlFor="cardNumber">
                  <span className="">{t("cartNumber")}</span>
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
                  <span>{t("cardName")}</span>
                  <input name="cardName" type="text" required />
                </label>
              </div>
              <div className="cartDeliveryRow">
                <label htmlFor="expDate">
                  <span>{t("expirationDate")}</span>
                  <input name="expDate" type="date" required />
                </label>
                <label htmlFor="cvv">
                  <span>{t("cvv")}</span>
                  <input name="cvv" type="text" maxLength="3" required />
                </label>
              </div>
            </div>
          </section>
          <section className="cartTotal">
            <button type="submit" className="cartButtonSubmit">
              {t("paymentButton")}
            </button>
          </section>
        </div>
      </form>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["payment"])),
    },
  };
}

export default Payment;
