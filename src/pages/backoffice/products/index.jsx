import Layout from "@/web/components/backoffice/Layout";
import { useState } from "react";
import Table from "@/web/components/backoffice/Table";
import { classnames } from "@/pages/_app";
import { nunito } from "@/pages/_app";
import Button from "@/web/components/Button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import styles from "@/styles/backoffice/statsPages.module.css";
import { parseCookies } from "nookies";
import checkToken from "@/web/services/checkToken";
import checkIsAdmin from "@/web/services/checkIsAdmin";

// Prototype datas
const productsProto = [
  {
    id: 1,
    name: "Modern beechwood chair",
    type: "Wood",
    price: 223,
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
  {
    id: 2,
    name: "Chair",
    type: "Wood",
    price: 98,
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
  {
    id: 3,
    name: "Chair",
    type: "Wood",
    price: 134,
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
  {
    id: 4,
    name: "Chair",
    type: "Wood",
    price: 19,
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
  {
    id: 5,
    name: "Chair",
    type: "Wood",
    price: 86,
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
  {
    id: 6,
    name: "Chair",
    type: "Wood",
    price: 109,
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
  {
    id: 6,
    name: "Chair",
    type: "Wood",
    price: 109,
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
  {
    id: 6,
    name: "Chair",
    type: "Wood",
    price: 109,
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
  {
    id: 6,
    name: "Chair",
    type: "Wood",
    price: 109,
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
  {
    id: 6,
    name: "Chair",
    type: "Wood",
    price: 109,
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
  },
];

const BackofficeProducts = () => {
  const [products, _] = useState(productsProto);

  // const sortByPrice = useCallback(() => {
  //   setProducts(
  //     [...products].sort((a, b) => (a.price - b.price )));
  // }, [products]);

  const sumTotalProducts = () => {
    const sumTotalProducts = products.reduce(
      (sum, value) => sum + value.stock,
      0
    );
    return sumTotalProducts;
  };

  return (
    <main className={classnames(styles.mainContainer, nunito.className)}>
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
            <Button onClick={() => console.log("Product added ! ")}>
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
      prototype: "nothing",
    },
  };
};
export default BackofficeProducts;
