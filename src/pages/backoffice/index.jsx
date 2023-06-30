import Layout from "@/web/components/backoffice/Layout";
import { parseCookies } from "nookies";
import checkToken from "@/web/services/checkToken";
import checkIsAdmin from "@/web/services/checkIsAdmin";

const Backoffice = () => {
  return <h2>Page index backoffice</h2>;
};

Backoffice.getLayout = function (page) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async (context) => {
  const { token } = parseCookies(context);
  const badTokenRedirect = await checkToken(token);

  if (badTokenRedirect) {
    return badTokenRedirect;
  }

  const notAdminRedirect = await checkIsAdmin(context);

  if (notAdminRedirect) {
    return notAdminRedirect;
  }

  return {
    props: {
      prototype: "nothing",
    },
  };
};

export default Backoffice;
