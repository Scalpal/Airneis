import Layout from "@/web/components/backoffice/Layout";
import { useState } from "react";
import Table from "@/web/components/backoffice/Table";
import { classnames } from "@/pages/_app";
import { nunito } from "@/pages/_app";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import styles from "@/styles/backoffice/statsPages.module.css";
import { parseCookies } from "nookies";
import jsonwebtoken from "jsonwebtoken";
import Axios from "axios";
import routes from "@/web/routes";

// Prototype datas 
const ordersProto = [
  {
    id: 1,
    userId: 223,
    status: "Order placed",
    products: [
      {
        name: "Chaise moderne en bois de hêtre",
        price: 223,
        stock: 25,
      },
      {
        name: "chaise",
        price: 98,
        stock: 25,
      },
      {
        name: "chaise",
        price: 134,
        stock: 25,
      },
    ],
  },
  {
    id: 2,
    userId: 223,
    status: "Ready for delivery",
    products: [
      {
        name: "Chaise moderne en bois de hêtre",
        price: 223,
        stock: 25,
      },
      {
        name: "chaise",
        price: 98,
        stock: 25,
      },
      {
        name: "chaise",
        price: 134,
        stock: 25,
      },
    ],
  },
];



const BackofficeOrders = () => {

  const [orders, _] = useState(ordersProto);

  return (
    <main
      className={classnames(
        styles.mainContainer,
        nunito.className
      )}
    >
      <div className={styles.topStats}>
        <div>
          <p>Total of orders</p>
          <p> {orders.length}</p>
        </div>

        <div>
          <p>Total of products in stock</p>
          <p></p>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.actionBar}>

          <div>
            <p>Orders</p>

            <div className={styles.customSearchInput}>
              <input type="text" placeholder="Search an order" />
              <MagnifyingGlassIcon className={styles.actionBarIcon} />
            </div>
          </div>

        </div>

        <Table array={orders} />
      </div>
    </main>
  );
};
BackofficeOrders.isPublic = false;
BackofficeOrders.getLayout = function (page) {
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

export default BackofficeOrders; 