import styles from "@/styles/components/Footer.module.css";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const Footer = () => {
  const { t } = useTranslation(["footer"]);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInfos}>
        {/* Social network icons */}
        {/* <div>

          </div> */}

        <div className={styles.footerInfosLink}>
          <div className={styles.footerLink}>
            <Link href="">{t("termsOfUse")}</Link>
          </div>
          <div className={styles.footerLink}>
            <Link href="">{t("legalMentions")}</Link>
          </div>
          <div className={styles.footerLink}>
            <Link href="">{t("contact")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
