import Layout from "@/web/components/backoffice/Layout";
import { parseCookies } from "nookies";
import jsonwebtoken from "jsonwebtoken";
import config from "@/api/config.js";
import Axios from "axios";
import routes from "@/web/routes";

const BackofficeShop = () => {


  return (
    <>
      <h2>Gestion du carousel page daccueil </h2>
      <h2>Gestion des produits populaires</h2>
      <h2>Gestion des catégories </h2>
    </>

  );
};
BackofficeShop.isPublic = true;
BackofficeShop.getLayout = function (page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const { token } = parseCookies(context);

  if (!token) {
    return {
      redirect: {
        destination: "/home",
        permanent: false
      }
    };
  }
  const { payload } = jsonwebtoken.verify(token, config.security.jwt.secret);

  const { data: { user } } = await Axios.get(`http://localhost:3000/${routes.api.users.single(payload.user.id)}`);
   
  if (!user.isAdmin) {
    return {
      redirect: {
        destination: "/home",
        permanent: false
      }
    };
  }

  return {
    props: {
      user
    }
  };
};

export default BackofficeShop; 