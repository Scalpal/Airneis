import Layout from "@/web/components/backoffice/Layout";
import { parseCookies } from "nookies";
import jsonwebtoken from "jsonwebtoken";
import config from "@/api/config.js";
import Axios from "axios";
import routes from "@/web/routes";

const BackofficeStats = () => {


  return (
    <h2>Page index statistiques</h2>
  );
};
BackofficeStats.isPublic = true;
BackofficeStats.getLayout = function (page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const { token } = parseCookies(context);
  const { payload } = jsonwebtoken.verify(token, config.security.jwt.secret);

  if (!token) {
    return {
      redirect: {
        destination: "/home",
        permanent: false
      }
    };
  }

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

export default BackofficeStats; 