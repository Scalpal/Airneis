import styles from "@/styles/legalMentions.module.css";
import Banner from "@/web/components/Banner";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

const Mentions = () => {
  const { t } = useTranslation(["legalMentions"]);

  return (
    <>
      <Head>
        <title>{t("legalMentionsHeadTitle")}</title>
      </Head>
      <Banner className={styles.title} title={t("legalMentionsTitle")} />
      <p className={styles.informations}>{t("legalMentionsEnterprise")}</p>
      <p className={styles.informations}>{t("legalMentionsSiretNumber")}</p>
      <p className={styles.informations}>{t("legalMentionsAddress")}</p>
      <p className={styles.informations}>{t("legalMentionsPhone")}</p>
      <p className={styles.informations}>{t("legalMentionsEmail")}</p>
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
