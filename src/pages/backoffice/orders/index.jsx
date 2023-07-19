import Layout from "@/web/components/backoffice/Layout";
import Table from "@/web/components/backoffice/Table";
import { classnames } from "@/pages/_app";
import { nunito } from "@/pages/_app";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import styles from "@/styles/backoffice/statsPages.module.css";
import { parseCookies } from "nookies";
import checkToken from "@/web/services/checkToken";
import checkIsAdmin from "@/web/services/checkIsAdmin";

// Prototype datas
const orders = [
  {
    id: 1,
    userId: 223,
    status: "Order placed",
    products: [
      {
        name: "Modern beechwood chair",
        price: 223,
        stock: 25
      },
      {
        name: "Chair",
        price: 98,
        stock: 25
      },
      {
        name: "Chair",
        price: 134,
        stock: 25
      }
    ]
  },
  {
    id: 2,
    userId: 223,
    status: "Ready for delivery",
    products: [
      {
        name: "Modern beechwood chair",
        price: 223,
        stock: 25
      },
      {
        name: "Chair",
        price: 98,
        stock: 25
      },
      {
        name: "Chair",
        price: 134,
        stock: 25
      }
    ]
  }
];

const BackofficeOrders = () => {
  // const [orders, setOrders] = useState(ordersProto);

  return (
    <main className={classnames(styles.mainContainer, nunito.className)}>
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

BackofficeOrders.getLayout = function (page) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async (context) => {
  const { token } = parseCookies(context);
  const badTokenRedirect = await checkToken(token);

  if (badTokenRedirect) {
    return badTokenRedirect;
  }

  const notAdminRedirect = await checkIsAdmin(context);

  if (notAdminRedirect) {
    return notAdminRedirect;
  }

  return {
    props: {
      prototype: "nothing"
    }
  };
};
export default BackofficeOrders;
