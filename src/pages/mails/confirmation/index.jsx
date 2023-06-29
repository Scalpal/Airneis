import { useRouter } from "next/router";
import BackofficeLoginLayout from "@/web/components/backoffice/LoginLayout";
import routes from "@/web/utils/routes";
import styles from "@/styles/mails/confirmation.module.css";
import { useEffect, useState } from "react";
import useAppContext from "@/web/hooks/useAppContext";
import classNames from "classnames";

const MailConfirmation = () => {
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
        Return to Home
      </button>
    </div>
  );
};
MailConfirmation.isPublic = true;
MailConfirmation.getLayout = function (page) {
  return <BackofficeLoginLayout>{page}</BackofficeLoginLayout>;
};

export default MailConfirmation;
