import styles from "@/styles/backoffice/PopularProductsContent.module.css";
import CollapseMenu from "../CollapseMenu";
import useGetProductsSWR from "@/web/hooks/useGetProductsSWR";
import Modal from "../Modal";
import ProductToShowList from "./ProductToShowList";
import { useState } from "react";
import ProductCard from "../ProductCard";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

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

          <button
            className={styles.addProductButton}
            onClick={() => setShowModal(true)}
          >
            <ShoppingBagIcon className={styles.addProductIcon} />
            <p>Show product list</p>
          </button>
        </div>

      </CollapseMenu>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <ProductToShowList
          setShowModal={setShowModal}
          refreshProducts={refreshProducts}
          visibleProductsCount={products.length}
        />
      </Modal>
    </>

  );
};

export default PopularProductsContent;