import Banner from "@/web/components/Banner";
import styles from "@/styles/contact.module.css";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

const Contact = () => {
  const { t } = useTranslation(["contact"]);

  return (
    <>
      <Head>
        <title>{t("contactHeadTitle")}</title>
      </Head>
      <Banner title={t("contactTitle")} />
      <div className={styles.message}>
        <h2>{t("messsageAttente")}</h2>
      </div>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "contact",
        "footer",
        "drawerMenu",
        "navbar",
      ])),
    },
  };
}

export default Contact;
