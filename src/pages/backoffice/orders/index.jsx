import Layout from "@/web/components/backoffice/Layout";
import { useState } from "react";
import Table from "@/web/components/backoffice/Table";
import { classnames } from "@/pages/_app";
import { nunito } from "@/pages/_app";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import styles from "@/styles/backoffice/statsPages.module.css";

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
BackofficeOrders.isPublic = false
BackofficeOrders.getLayout = function (page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default BackofficeOrders; 