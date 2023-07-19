import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
const OrderConfirmation = () => {
  const { t } = useTranslation("orderConfirmation");

  return (
    <>
      <h1 className="cartTitle">{t("succedCommandTitle")}</h1>
      <div className="cartContainer">
        <section className="cartSuccessSummary">
          <div className="cartSuccessDiv">
            <h2 className="cartSuccessHead">{t("succedCommandHead")}</h2>
            <p>{t("succedCommandText")}</p>
          </div>
        </section>
        <section className="cartSuccessRight">
          <button type="submit" className="cartButtonSubmit">
            {t("returnButtonContinueShopping")}
          </button>
        </section>
      </div>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["orderConfirmation"]))
    }
  };
}

export default OrderConfirmation;
