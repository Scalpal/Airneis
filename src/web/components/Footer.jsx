import styles from "@/styles/components/Footer.module.css";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import routes from "../routes";

const Footer = () => {
  const { t } = useTranslation(["footer"]);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInfos}>

        <div>
          <h2>Airneis</h2>

          <p> {t("adress")} </p>
          <p> 23 rue de la tour, 75008 Paris </p>
        </div>

        <div>
          <h2>{t("myAccount")} </h2>
          <Link href={routes.login()}>{t("login")}</Link>
          <Link href={routes.register()}>{t("register")}</Link>
          <p>Order status</p>
        </div>

        <div>
          <h2>{t("shop")}</h2>
          <Link href={routes.products.base()}>{t("allProducts")}</Link>
          <Link href={routes.categories.base()}>{t("allCategories")}</Link>
        </div>

        <div>
          <h2>{t("legal")}</h2>
          <Link href={routes.legalMentions()}>{t("legalMentions")}</Link>
          <Link href={routes.contact()}>{t("contact")}</Link>
          <Link href={routes.cgu()}>{t("termsOfUse")}</Link>
          <p>{t("privacyAndPolicy")}</p>
        </div>
      </div>

      <p className={styles.copyrightText}>
        {" "}
        Copyright ©2022 Airneis. {t("allRightsReserved")}{" "}
      </p>
    </footer>
  );
};

export default Footer;
