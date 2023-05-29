import Layout from "@/web/components/backoffice/Layout";
import { useCallback, useEffect, useState } from "react";
import Table from "@/web/components/backoffice/Table";
import { classnames } from "@/pages/_app";
import { nunito } from "@/pages/_app";
import Button from "@/web/components/Button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import styles from "@/styles/backoffice/statsPages.module.css";
import { parseCookies } from "nookies";
import checkToken from "@/web/services/checkToken";
import checkIsAdmin from "@/web/services/checkIsAdmin";
import getApiClient from "@/web/services/getApiClient";
import routes from "@/web/routes";
import { AxiosError } from "axios";
import ActionBar from "@/web/components/backoffice/ActionBar";
import { useRouter } from "next/router";
import { createQueryString } from "@/web/services/createQueryString";

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

  const reqInstance = getApiClient(context); 

  try {
    const { data: { products, count } } = await reqInstance.get(`http://localhost:3000${routes.api.products.collection()}`);

    return {
      props: {
        productsProps: products,
        count: count
      },
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response);
    }

    return {
      props: {
        productsProps: [],
        count: 0
      }
    };
  }
};

const BackofficeProducts = (props) => {
  const { productsProps, count } = props; 

  const router = useRouter(); 
  const [alert, setAlert] = useState({ status: "", message: ""}); 
  const [showAlert, setShowAlert] = useState(false); 
  const [products, setProducts] = useState({ products: productsProps, count: count });
  const [queryParams, setQueryParams] = useState({
    limit: 10,
    page: 1,
    order: "asc",
    orderField: "id",
    search: ""
  });

  const handleQueryParams = useCallback((key, value) => {
    setQueryParams({
      ...queryParams,
      [key]: value
    });
  }, [queryParams]);

  const handleLimit = useCallback((value) => {
    setQueryParams({
      ...queryParams,
      page: 1,
      limit: value
    });
  }, [queryParams]); 

  const sortColumn = useCallback((column) => {
    const notSortableKeys = ["description", "category", "materials"];

    if (notSortableKeys.includes(column)) {
      return false; 
    }
    
    // By default, when we sort a column, we set it to ASC
    if (column !== queryParams["orderField"]) {
      setQueryParams({
        ...queryParams,
        page: 1,
        orderField: column,
        order: "asc"
      }); 
      
      return;
    }

    setQueryParams({
      ...queryParams,
      page: 1,
      orderField: column,
      order: queryParams["order"] === "asc" ? "desc" : "asc"
    }); 
  }, [queryParams]);

  const updateProducts = useCallback(async() => {
    const reqInstance = getApiClient();

    const queryString = createQueryString(queryParams);

    try {
      const { data: { products, count } } = await reqInstance.get(`http://localhost:3000/${routes.api.products.collection(queryString)}`);
    
      setProducts({ products, count });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response);
      }
    }
  }, [queryParams]);

  const redirectToAddPage = useCallback(() => {
    router.push(routes.backoffice.products.add());
  }, [router]); 

  const sumTotalProducts = () => {
    const sumTotalProducts = productsProps.reduce(
      (sum, value) => sum + value.stock,
      0
    );

    return sumTotalProducts;
  };

  useEffect(() => {
    updateProducts(); 
  }, [queryParams, updateProducts]);

  return (
    <main className={classnames(styles.mainContainer, nunito.className)}>
      <div className={styles.topStats}>
        <div>
          <p>Total of unique products</p>
          <p> {count}</p>
        </div>

        <div>
          <p>Total of products in stock</p>
          <p>{sumTotalProducts()}</p>
        </div>
      </div>

      <div className={styles.mainContent}>

        <ActionBar
          label={"All products"}
          handleLimit={handleLimit}
          dataCount={products.count}
          queryParams={queryParams}
          setQueryParams={setQueryParams}
          handleQueryParams={handleQueryParams}
          addRowFunction={redirectToAddPage}
        />

        {productsProps.length > 0 && (
          <Table
            array={products.products}
            safeArray={productsProps}
            queryParams={queryParams}
            sortColumn={sortColumn}
            // showSpecificRowFunction={showSpecificUser}
            // deleteRowFunction={desactivateUser}
          />
        )}

      </div>
    </main>
  );
};
BackofficeProducts.isPublic = true;
BackofficeProducts.getLayout = function (page) {
  return <Layout>{page}</Layout>;
};

export default BackofficeProducts;
