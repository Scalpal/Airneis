import styles from "@/styles/termsAndConditions.module.css";
import Banner from "@/web/components/Banner";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Conditions = () => {
  const { t: translate } = useTranslation(["termsOfUse"]);

  return (
    <>
      <Banner className={styles.title} title={"Terms and conditions"} />
      <p className={styles.informations}>{translate("termsIntroduction")}</p>
      <h2 className={styles.titleInformations}>
        {translate("accountAndMembership")}
      </h2>
      <p className={styles.informations}>
        {translate("termsAccountAndMembership")}
      </p>
      <h2 className={styles.titleInformations}>{translate("userContent")}</h2>
      <p className={styles.informations}>{translate("termsUserContent")}</p>
      <h2 className={styles.titleInformations}>{translate("backups")}</h2>
      <p className={styles.informations}>{translate("termsBackups")}</p>
      <h2 className={styles.titleInformations}>
        {translate("linksOtherResources")}
      </h2>
      <p className={styles.informations}>
        {translate("termsLinksOtherResources")}
      </p>
      <h2 className={styles.titleInformations}>
        {translate("intellectualPropertyRights")}
      </h2>
      <p className={styles.informations}>
        {translate("termsIntellectualPropertyRights")}
      </p>
      <h2 className={styles.titleInformations}>{translate("severability")}</h2>
      <p className={styles.informations}>{translate("termsSeverability")}</p>
      <h2 className={styles.titleInformations}>
        {translate("changesAndAmendments")}
      </h2>
      <p className={styles.informations}>
        {translate("termsChangesAndAmendments")}
      </p>
      <h2 className={styles.titleInformations}>
        {translate("acceptanceTerms")}
      </h2>
      <p className={styles.informations}>{translate("termsAcceptanceTerms")}</p>
      <h2 className={styles.titleInformations}>{translate("contactingUs")}</h2>
      <p className={styles.informations}>{translate("termsContactingUs")}</p>
      <p className={styles.informations}>{translate("termsUpdate")}</p>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["termsOfUse"])),
    },
  };
}

Conditions.isPublic = true;
export default Conditions;
