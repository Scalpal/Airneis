import Layout from "@/web/components/backoffice/Layout";
import { parseCookies } from "nookies";
import checkToken from "@/web/services/checkToken";
import checkIsAdmin from "@/web/services/checkIsAdmin";

const BackofficeShop = () => {
  return (
    <>
      <h2>Gestion du carousel page daccueil </h2>
      <h2>Gestion des produits populaires</h2>
      <h2>Gestion des catégories </h2>
    </>
  );
};

BackofficeShop.getLayout = function (page) {
  return <Layout>{page}</Layout>;
};

export default BackofficeShop;

export const getServerSideProps = async (context) => {
  const { token } = parseCookies(context);
  const badTokenRedirect = await checkToken(token);

  if (badTokenRedirect) {
    return badTokenRedirect;
  }

  const notAdminRedirect = await checkIsAdmin(context);

  if (notAdminRedirect) {
    return notAdminRedirect;

  return {
    props: {
      prototype: "nothing",
    },
  };
};
