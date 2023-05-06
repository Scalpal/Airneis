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

  if (!token) {
    return {
      redirect: {
        destination: "/home",
        permanent: false
      }
    };
  }

  const { payload } = jsonwebtoken.verify(token, config.security.jwt.secret);

  const { data: { user } } = await Axios.get(`http://localhost:3000/api/${routes.api.users.single(payload.user.id)}`);
   
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

BackofficeDashboard.isPublic = false;
export default BackofficeDashboard; 