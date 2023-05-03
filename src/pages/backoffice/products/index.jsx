import Layout from "@/web/components/backoffice/Layout";
import { useState } from "react";
import Table from "@/web/components/backoffice/Table";
import { classnames } from "@/pages/_app";
import { nunito } from "@/pages/_app";
import Button from "@/web/components/Button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import styles from "@/styles/backoffice/statsPages.module.css";
import { parseCookies } from "nookies";
import jsonwebtoken from "jsonwebtoken";
import config from "@/api/config.js";
import Axios from "axios";
import routes from "@/web/routes";

// Prototype datas 
const productsProto = [
  {
    id: 1,
    name: "Chaise moderne en bois de hêtre",
    type: "bois",
    price: 223,
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
  {
    id: 2,
    name: "chaise",
    type: "bois",
    price: 98,
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
  {
    id: 3,
    name: "chaise",
    type: "bois",
    price: 134,
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
  {
    id: 4,
    name: "chaise",
    type: "bois",
    price: 19,
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
  {
    id: 5,
    name: "chaise",
    type: "bois",
    price: 86,
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
  {
    id: 6,
    name: "chaise",
    type: "bois",
    price: 109,
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
  {
    id: 6,
    name: "chaise",
    type: "bois",
    price: 109,
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
  {
    id: 6,
    name: "chaise",
    type: "bois",
    price: 109,
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
  {
    id: 6,
    name: "chaise",
    type: "bois",
    price: 109,
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
  {
    id: 6,
    name: "chaise",
    type: "bois",
    price: 109,
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  }
];



const BackofficeProducts = () => {

  const [products, _] = useState(productsProto);

  // const sortByPrice = useCallback(() => {
  //   setProducts(
  //     [...products].sort((a, b) => (a.price - b.price )));
  // }, [products]);

  const sumTotalProducts = () => {
    const sumTotalProducts = products.reduce((sum, value) => sum + value.stock, 0);
    return sumTotalProducts;
  };

  return (
    <main
      className={classnames(
        styles.mainContainer,
        nunito.className
      )}
    >
      <div className={styles.topStats}>
        <div>
          <p>Total of unique products</p>
          <p> {products.length}</p>
        </div>

        <div>
          <p>Total of products in stock</p>
          <p>{sumTotalProducts()}</p>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.actionBar}>
          <div>
            <p>Products</p>

            <div className={styles.customSearchInput}>
              <input type="text" placeholder="Search a product" />
              <MagnifyingGlassIcon className={styles.actionBarIcon} />
            </div>
          </div>

          <div>
            <Button
              onClick={() => console.log("Product added ! ")}
            >
              Add a product
            </Button>
          </div>
        </div>

        <Table array={products} />
      </div>
    </main>
  );
};
BackofficeProducts.isPublic = true;
BackofficeProducts.getLayout = function (page) {
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

  const { data: { user } } = await Axios.get(`http://localhost:3000/${routes.api.specificUser(payload.user.id)}`);
   
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

export default BackofficeProducts; 