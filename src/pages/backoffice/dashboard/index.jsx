import Layout from "@/web/components/backoffice/Layout";
import { parseCookies } from "nookies";
import jsonwebtoken from "jsonwebtoken";
import config from "@/api/config.js";
import Axios from "axios";
import routes from "@/web/routes";

const BackofficeDashboard = () => {

  return (
    <h2>Dashboard</h2>
  );
};



BackofficeDashboard.getLayout = (page) => {
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

  const user = await Axios.get(`http://localhost:3000/${routes.api.specificUser(payload.user.id)}`);

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
      user: user
    }
  };
};

BackofficeDashboard.isPublic = false;
export default BackofficeDashboard; 