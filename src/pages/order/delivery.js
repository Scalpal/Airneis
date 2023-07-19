import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
const Delivery = () => {
  const { t } = useTranslation("delivery");

  return (
    <>
      <h1 className="cartTitle">{t("cartTitle")}</h1>
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
                  <span className="">{t("firstName")}*</span>
                  <input name="firstName" type="text" required />
                </label>
                <label htmlFor="lastName">
                  <span className="">{t("lastName")}</span>
                  <input name="lastName" type="text" required />
                </label>
              </div>
              <div className="cartDeliveryRow">
                <label htmlFor="addressOne">
                  <span>{t("address")}</span>
                  <input name="addressOne" type="text" required />
                </label>
              </div>
              <div className="cartDeliveryRow">
                <label htmlFor="addressTwo">
                  <span>{t("complementaryAddress")}</span>
                  <input name="addressTwo" type="text" />
                </label>
              </div>
              <div className="cartDeliveryRow">
                <label htmlFor="postCode">
                  <span>{t("postCode")}</span>
                  <input name="postCode" type="text" required />
                </label>
                <label htmlFor="city">
                  <span>{t("city")}</span>
                  <input name="city" type="text" required />
                </label>
              </div>
              <div className="cartDeliveryRow">
                <label htmlFor="phoneNumber">
                  <span>{t("phoneNumber")}</span>
                  +33 <input name="phoneNumber" type="text" required />
                </label>
              </div>
            </div>
          </section>
          <section className="cartTotal">
            <button className="cartButtonSubmit">
              {t("cartButtonPayment")}
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
      ...(await serverSideTranslations(locale, ["delivery"]))
    }
  };
}

export default Delivery;
