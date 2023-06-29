import { useRouter } from "next/router";
import BackofficeLoginLayout from "@/web/components/backoffice/LoginLayout";
import routes from "@/web/routes";
import axios from "axios";
import styles from "@/styles/mails/confirmation.module.css";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const MailConfirmation = ({ error }) => {
  const { t } = useTranslation("confirmationMail");
  const router = useRouter();

  const handleclick = () => {
    router.push(routes.home());
  };

  return (
    <div className={styles.div}>
      {error ? (
        <span className={styles.error}>{t("accountErrorText")}</span>
      ) : (
        <span className={styles.success}>{t("accountValidateText")}</span>
      )}
      <button className={styles.button} onClick={handleclick}>
        {t("returnHomeButton")}
      </button>
    </div>
  );
};

MailConfirmation.getLayout = function (page) {
  return <BackofficeLoginLayout>{page}</BackofficeLoginLayout>;
};

export default MailConfirmation;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { locale } = context.locale;

  try {
    await axios.put(`
    ${process.env.API_URL}/api/mail/confirmation?id=${id}`);

    return {
      props: {
        error: null,
      },
    };
  } catch (error) {
    return {
      props: {
        error: true,
        ...(await serverSideTranslations(locale, ["confirmationMail"])),
      },
    };
  }
}
