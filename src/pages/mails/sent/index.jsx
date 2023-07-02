import styles from "@/styles/mails/confirmation.module.css";
import BackofficeLoginLayout from "@/web/components/backoffice/LoginLayout";

const MailSent = () => {
  return (
    <div className={styles.div}>
      <span className={styles.answer}>
        We sent you an email. Please check your mailbox.
      </span>
    </div>
  );
};
MailSent.isPublic = true;
MailSent.getLayout = function (page) {
  return <BackofficeLoginLayout>{page}</BackofficeLoginLayout>;
};
export default MailSent;
