import { useRouter } from "next/router";
import BackofficeLoginLayout from "@/web/components/backoffice/LoginLayout";
import routes from "@/web/routes";
import styles from "@/styles/mails/confirmation.module.css";
import { useEffect, useState } from "react";
import useAppContext from "@/web/hooks/useAppContext";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const MailConfirmation = () => {
  const { t } = useTranslation("confirmationMail");
  const [err, setErr] = useState(false);
  const [answer, setAnswer] = useState(null);
  const router = useRouter();
  const { codedId } = router.query;
  const id = decodeURIComponent(codedId);
  const {
    services: {
      users: { confirmAccount },
      security: { crypt },
    },
  } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      if (codedId) {
        const [{ getId }] = await crypt([{ id }]);

        if (!getId) {
          setAnswer("Invalid page");
          setErr(true);

          return;
        }

        const [error, results] = await confirmAccount(getId);

        if (error) {
          setAnswer(error);
          setErr(true);

          return;
        }

        setAnswer(results);
      }
    };
    fetchData();
  }, [codedId, confirmAccount, crypt, err, id]);

  const handleclick = () => {
    router.push(routes.home());
  };

  return (
    <div className={styles.div}>
      <span className={classNames(styles.answer, { [styles.error]: err })}>
        {answer}
      </span>
      <button className={styles.button} onClick={handleclick}>
        {t("returnHomeButton")}
      </button>
    </div>
  );
};
MailConfirmation.isPublic = true;
MailConfirmation.getLayout = function (page) {
  return <BackofficeLoginLayout>{page}</BackofficeLoginLayout>;
};

export default MailConfirmation;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "confirmationMail",
        "footer",
        "drawerMenu",
        "navbar",
      ])),
    },
  };
}
