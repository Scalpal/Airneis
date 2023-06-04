import { useRouter } from "next/router";
import BackofficeLoginLayout from "@/web/components/backoffice/LoginLayout";
import routes from "@/web/routes";
import config from "@/api/config.js";
import axios from "axios";
import styles from "@/styles/mails/confirmation.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const MailConfirmation = ({ error, answer }) => {
  if (error) {
    console.log(answer);
  }

  const router = useRouter();
  const handleclick = () => {
    router.push(routes.home());
  };
  const { t: translate } = useTranslation("confirmationMail");

  return (
    <div className={styles.div}>
      {error ? (
        <span className={styles.error}>{translate("accountErrorText")}</span>
      ) : (
        <span className={styles.success}>
          {translate("accountValidateText")}
        </span>
      )}
      <button className={styles.button} onClick={handleclick}>
        {translate("returnHomeButton")}
      </button>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["confirmationMail"])),
    },
  };
};

MailConfirmation.isPublic = true;
MailConfirmation.getLayout = function (page) {
  return <BackofficeLoginLayout>{page}</BackofficeLoginLayout>;
};

export default MailConfirmation;

export async function getServerSideProps(context) {
  const cryptoId = decodeURIComponent(context.query.key);

  const crypt = async (CryptoValues) => {
    try {
      const {
        data: { CryptoKey },
      } = await axios.post(`${config.baseURL}/api/${routes.api.crypt()}`, {
        CryptoValues,
      });

      return CryptoKey;
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong";

      return {
        props: {
          error: true,
          answer: [Array.isArray(error) ? error : [error]],
        },
      };
    }
  };
  const [{ getCryptoId }] = await crypt([{ cryptoId }]);

  try {
    await axios.patch(`${config.baseURL}/api/${routes.api.activate()}`, {
      id: getCryptoId,
    });

    return {
      props: {
        error: false,
      },
    };
  } catch (err) {
    const error = err.response?.data?.error || "Oops. Something went wrong";

    return {
      props: {
        error: true,
        answer: [Array.isArray(error) ? error : [error]],
      },
    };
  }
}
