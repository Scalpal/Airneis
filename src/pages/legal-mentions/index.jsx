import styles from "@/styles/legalMentions.module.css";
import Banner from "@/web/components/Banner";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Mentions = () => {
  const { t } = useTranslation(["legalMentions"]);

  return (
    <>
      <Banner className={styles.title} title={t("legalMentionsTitle")} />
      <p className={styles.informations}>{t("airneisTypeEntreprise")}</p>
      <p className={styles.informations}>{t("airneisNumeroSiret")}</p>
      <p className={styles.informations}>{t("airneisAddress")}</p>
      <p className={styles.informations}>{t("airneisTelephone")}</p>
      <p className={styles.informations}>{t("airneisEmail")}</p>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "legalMentions",
        "footer",
        "drawerMenu",
        "navbar",
      ])),
    },
  };
}

Mentions.isPublic = true;
export default Mentions;
