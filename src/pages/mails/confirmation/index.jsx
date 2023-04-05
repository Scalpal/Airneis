import { useRouter } from "next/router";
import BackofficeLoginLayout from "@/web/components/backoffice/LoginLayout";
import routes from "@/web/routes";
import axios from "axios";
import styles from "@/styles/mails/confirmation.module.css";

const MailConfirmation = ({ error }) => {
  const router = useRouter();
  console.log(error);
  const handleclick = () => {
    router.push(routes.home());
  };

  return (
    <div className={styles.div}>
      {error ?
        <span className={styles.error}>We cannot activate your account, please retry later</span> :
        <span className={styles.success}>Your account is validate with success</span>
      }
      <button className={styles.button} onClick={handleclick}>Return to Home</button>
    </div>
  );
};
MailConfirmation.isPublic = true;
MailConfirmation.getLayout = function (page) {
  return (
    <BackofficeLoginLayout>
      {page}
    </BackofficeLoginLayout>
  );
};

export default MailConfirmation;

export async function getServerSideProps(context) {

  const { id } = context.query;

  try {
    await axios.put(`
    http://localhost:3000/api/mail/confirmation?id=${id}`);
    return {
      props: {
        error: null
      }
    };
  } catch (error) {
    return {
      props: {
        error: true
      }
    };
  }
}