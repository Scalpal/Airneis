import Layout from "@/web/components/backoffice/Layout";
import { parseCookies } from "nookies";
import jsonwebtoken from "jsonwebtoken";
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

  const decodedToken = jsonwebtoken.decode(token); 
  const isTokenExpired = Date.now() >= decodedToken.expires * 1000; 

  if (isTokenExpired) {
    return {
      redirect: {
        destination: "/home",
        permanent: false
      }
    };
  }

  const reqInstance = Axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const { data: { user } } = await reqInstance.get(`http://localhost:3000/${routes.api.users.self()}`);
   
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