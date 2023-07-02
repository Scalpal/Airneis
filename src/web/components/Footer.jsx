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

          <div className={styles.footerInfosLink}>
            <div className={styles.footerLink}>
              <Link href={routes.cgu()}>{t("termsOfUse")}</Link>
            </div>
            <div className={styles.footerLink}>
              <Link href={routes.legalMentions()}>{t("legalMentions")}</Link>
            </div>
            <div className={styles.footerLink}>
              <Link href={routes.contact()}>{t("contact")}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
