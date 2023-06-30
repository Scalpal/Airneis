import { useRouter } from "next/router";
import BackofficeLoginLayout from "@/web/components/backoffice/LoginLayout";
import routes from "@/web/routes";
import config from "@/api/config.js";
import axios from "axios";
import styles from "@/styles/mails/confirmation.module.css";

const MailConfirmation = ({ error,answer }) => {
  if (error) {
    console.log(answer);
  }
  const router = useRouter();
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
    ${process.env.API_URL}/api/mail/confirmation?id=${id}`);

    
return {
      props: {
        error: false
      }
    };
  } catch (err) {
    const error = err.response?.data?.error || "Oops. Something went wrong";

    return {
      props: {
        error: true,
        answer: [Array.isArray(error) ? error : [error]]
      }
    };
  }
}