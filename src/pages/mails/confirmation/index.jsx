import { useRouter } from "next/router";
import BackofficeLoginLayout from "@/web/components/backoffice/LoginLayout";
import routes from "@/web/routes";
import axios from "axios";

const MailConfirmation = ({ error }) => {
  const router = useRouter();
  console.log(error);
  const handleclick = () => {
    router.push(routes.home());
  };

  return (
    <>
      {error ?
        <span>We cannot activate your account, please retry later</span> :
        <span>Your account is validate with success</span>
      }
      <button onClick={handleclick}>Return to Home</button>
    </>
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