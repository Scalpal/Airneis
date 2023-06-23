import styles from "@/styles/backoffice/statsPages.module.css";
import Layout from "@/web/components/backoffice/Layout";
import { useCallback, useEffect, useState } from "react";
import Table from "@/web/components/backoffice/Table";
import { classnames } from "@/pages/_app";
import { nunito } from "@/pages/_app";
import { parseCookies } from "nookies";
import checkToken from "@/web/services/checkToken";
import checkIsAdmin from "@/web/services/checkIsAdmin";
import getApiClient from "@/web/services/getApiClient";
import routes from "@/web/routes";
import { AxiosError } from "axios";
import ActionBar from "@/web/components/backoffice/ActionBar";
import CustomAlert from "@/web/components/CustomAlert.jsx";
import Modal from "@/web/components/Modal";
import SpecificProductPageContent from "@/web/components/backoffice/SpecificProductPageContent";
import AddProductPageContent from "@/web/components/backoffice/AddProductPageContent";
import useGetProductsSWR from "@/web/hooks/useGetProductsSWR";
import Loader from "@/web/components/Loader";

const addProductTab = "add-product";
const productInfoTab = "product-info";

export const getServerSideProps = async (context) => {
  const { token } = parseCookies(context);
  const badTokenRedirect = await checkToken(token);
  const notAdminRedirect = await checkIsAdmin(context);

  if (badTokenRedirect || notAdminRedirect) {
    return badTokenRedirect || notAdminRedirect;
  }

  const reqInstance = getApiClient(context); 

  try {
    const { data: { products } } = await reqInstance.get(`${process.env.API_URL}${routes.api.products.collection()}`);

    return {
      props: {
        productsProps: products,
      },
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        props: {
          productsProps: [],
        }
      };
    }

    return {
      props: {
        productsProps: [],
      }
    };
  }
};

const BackofficeProducts = (props) => {
  const { productsProps } = props; 

  const [alert, setAlert] = useState({ status: "", message: ""}); 
  const [showAlert, setShowAlert] = useState(false); 
  const [activeProduct, setActiveProduct] = useState(null); 
  const [showModal, setShowModal] = useState(false); 
  const [activeTab, setActiveTab] = useState("");
  const [queryParams, setQueryParams] = useState({
    limit: 10,
    page: 1,
    order: "asc",
    orderField: "id",
    search: ""
  });

  const { productsData, productsError, productsIsLoading, refreshProducts } = useGetProductsSWR(queryParams);
  const products = (!productsIsLoading && !productsError) ? productsData.products : [];
  const count = (!productsIsLoading && !productsError) ? productsData.count : 0;

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

  const sumTotalProducts = () => {
    const sumTotalProducts = productsProps.reduce(
      (sum, value) => sum + value.stock,
      0
    );

    return sumTotalProducts;
  };

  const openAddProductModal = useCallback(() => {
    setActiveTab(addProductTab);
    setShowModal(true); 
  }, []); 

  const showSpecificProduct = useCallback((id) => {
    const product = productsData.products.find(elt => elt.id === id); 

    setShowModal(true);
    setActiveTab(productInfoTab);
    setActiveProduct(product);
  }, [productsData]);

  useEffect(() => {
    refreshProducts();
  }, [queryParams, refreshProducts]);

  useEffect(() => {
    if (productsError) {
      setShowAlert(true); 
      setAlert({ status: productsError.status, message: productsError.message });
    }
  }, [productsError]);

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
          dataCount={count}
          queryParams={queryParams}
          setQueryParams={setQueryParams}
          handleQueryParams={handleQueryParams}
          addRowFunction={openAddProductModal}
        />

        {!productsIsLoading ? (
          <Table
            array={products}
            safeArray={productsProps} // The first item is used to get the table headers, and as we need it, it mustn't be undefined and props don't change
            visibleColumns={["id", "name", "description", "price", "stock", "category", "materials"]}
            queryParams={queryParams}
            sortColumn={sortColumn}
            showSpecificRowFunction={showSpecificProduct}
          />
        ) : (
          <div className={styles.loaderWrapper}>
            <Loader />
          </div>
        )}
      </div>

      <Modal showModal={showModal} setShowModal={setShowModal}>
        {(activeProduct && activeTab === productInfoTab) && (
          <SpecificProductPageContent
            showModal={showModal}
            setShowModal={setShowModal}
            setActiveProduct={setActiveProduct}
            product={activeProduct}
            refreshProducts={refreshProducts}
            key={activeProduct.id}
          />
        )}

        {activeTab === addProductTab && (
          <AddProductPageContent
            setShowModal={setShowModal}
            refreshProducts={refreshProducts}
          />
        )}
      </Modal> 

      <CustomAlert
        alert={alert}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
    </main>
  );
};

BackofficeProducts.getLayout = function (page) {
  return <Layout>{page}</Layout>
}

export default BackofficeProducts;
