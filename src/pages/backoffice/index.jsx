import Layout from "@/web/components/backoffice/Layout";
import { parseCookies } from "nookies";
import jsonwebtoken from "jsonwebtoken";
import config from "@/api/config.js";
import Axios from "axios";
import routes from "@/web/routes";
import { useEffect } from "react";

const Backoffice = (props) => {

  useEffect(() => {
    console.log("props : ", props); 
  }, []);

  return (
    <h2>Page index backoffice</h2>
  );
};
Backoffice.isPublic = true;
Backoffice.getLayout = function (page) {
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

export default Backoffice; 