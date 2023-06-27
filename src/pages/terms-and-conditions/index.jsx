import styles from "@/styles/termsAndConditions.module.css";
import Banner from "@/web/components/Banner";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Conditions = () => {
  const { t } = useTranslation(["termsOfUse"]);

  return (
    <>
      <Banner className={styles.title} title={t("Terms and conditions")} />
      <p className={styles.informations}>{t("termsIntroduction")}</p>
      <h2 className={styles.titleInformations}>{t("accountAndMembership")}</h2>
      <p className={styles.informations}>{t("termsAccountAndMembership")}</p>
      <h2 className={styles.titleInformations}>{t("userContent")}</h2>
      <p className={styles.informations}>{t("termsUserContent")}</p>
      <h2 className={styles.titleInformations}>{t("backups")}</h2>
      <p className={styles.informations}>{t("termsBackups")}</p>
      <h2 className={styles.titleInformations}>{t("linksOtherResources")}</h2>
      <p className={styles.informations}>{t("termsLinksOtherResources")}</p>
      <h2 className={styles.titleInformations}>
        {t("intellectualPropertyRights")}
      </h2>
      <p className={styles.informations}>
        {t("termsIntellectualPropertyRights")}
      </p>
      <h2 className={styles.titleInformations}>{t("severability")}</h2>
      <p className={styles.informations}>{t("termsSeverability")}</p>
      <h2 className={styles.titleInformations}>{t("changesAndAmendments")}</h2>
      <p className={styles.informations}>{t("termsChangesAndAmendments")}</p>
      <h2 className={styles.titleInformations}>{t("acceptanceTerms")}</h2>
      <p className={styles.informations}>{t("termsAcceptanceTerms")}</p>
      <h2 className={styles.titleInformations}>{t("contactingUs")}</h2>
      <p className={styles.informations}>{t("termsContactingUs")}</p>
      <p className={styles.informations}>{t("termsUpdate")}</p>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "termsOfUse",
        "footer",
        "drawerMenu",
        "navbar",
      ])),
    },
  };
}

Conditions.isPublic = true;
export default Conditions;
