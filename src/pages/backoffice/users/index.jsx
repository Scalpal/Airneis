import Layout from "@/web/components/backoffice/Layout";
import Table from "@/web/components/backoffice/Table";
import { classnames } from "@/pages/_app";
import { nunito } from "@/pages/_app";
import styles from "@/styles/backoffice/statsPages.module.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { parseCookies } from "nookies";
import jsonwebtoken from "jsonwebtoken";
import config from "@/api/config.js";
import Axios from "axios";
import routes from "@/web/routes";


const BackofficeUsers = (props) => {
  const { users } = props; 

  return (
    <main
      className={classnames(
        styles.mainContainer,
        nunito.className
      )}
    >
      <div className={styles.topStats}>
        <div>
          <p>Total of users</p>
          <p>{users.length}</p>
        </div>

        {/* This will be a sum of users that has an order in the last 6 months */}
        <div>
          <p>Total of active users</p>
          <p>3</p>
        </div>


        <div>
          <p>Total of customers (at least 1 order)</p>
          <p>{users.length}</p>
        </div>

        <div>
          <p>Percentage of customers in users</p>
          <p>{((100 * 2) / users.length).toFixed(2)}%</p>
        </div>
      </div>

      <div className={styles.mainContent}>

        <div className={styles.actionBar}>
          <div>
            <p>Users</p>

            <div className={styles.customSearchInput}>
              <input type="text" placeholder="Search a user" />
              <MagnifyingGlassIcon className={styles.actionBarIcon} />
            </div>
          </div>
        </div>

        <Table array={users} />
      </div>

    </main>
  );
};
BackofficeUsers.isPublic = true;
BackofficeUsers.getLayout = function (page) {
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

  const reqInstance = Axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const { data: { users } } = await reqInstance.get(`http://localhost:3000/${routes.api.users.collection()}`);

  return {
    props: {
      users: users
    }
  };
};

export default BackofficeUsers; 