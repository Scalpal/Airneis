import styles from "@/styles/backoffice/PopularProductsContent.module.css";
import CollapseMenu from "../CollapseMenu";
import useGetProductsSWR from "@/web/hooks/useGetProductsSWR";
import Modal from "../Modal";
import ProductToShowList from "./ProductToShowList";
import { useState } from "react";
import ProductCard from "../ProductCard";

const queryParams = {
  showInHome: true
};

const PopularProductsContent = () => {
  const [showModal, setShowModal] = useState(false);

  const { productsData, productsError, productsIsLoading, refreshProducts } = useGetProductsSWR(queryParams);
  const products = (!productsError && !productsIsLoading) ? productsData.products : []; 

  return (
    <>
      <CollapseMenu title={"Popular products"} size={"fit-to-parent"}>
        <div
          className={styles.container}
        >
          {products.map((product, index) => {
            return (
              <ProductCard
                product={product}
                key={index}
              />
            );
          })}

          <div
            className={styles.addProductButton}
            onClick={() => setShowModal(true)}
          >
            <p>Add a product to show</p>
          </div>
        </div>

      </CollapseMenu>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <ProductToShowList
          setShowModal={setShowModal}
          refreshProducts={refreshProducts}
        />
      </Modal>
    </>

  );
};

export default PopularProductsContent;