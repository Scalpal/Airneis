import styles from "@/styles/backoffice/ProductToShowList.module.css";
import BackButton from "./BackButton";
import useGetProducts from "@/web/hooks/useGetProducts";
import { useCallback, useEffect, useState } from "react";
import Loader from "../Loader";
import Button from "../Button";
import ImageWithFallback from "../ImageWithFallback";
import CustomSearchBar from "../CustomSearchBar";
import IconButton from "../IconButton";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { classnames } from "@/pages/_app";
import editShowInHome from "@/web/services/products/editShowInHome";
import CustomAlert from "../CustomAlert";

const searchBarId = "searchInput";
const limit = 30;

const ProductToShowList = (props) => {
  const { setShowModal, refreshProducts } = props;

  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState({ status: "", message: "" });
  const [showAlert, setShowAlert] = useState(false);

  const { data, error, isLoading, isValidating, size, setSize } = useGetProducts({ search: search, limit: limit }); 
  const products = (!isLoading && !error) ? data.reduce((acc, { products }) => [...acc, ...products], []) : [];
  const totalPages = data && data[0] ? Math.ceil(data[0].count / limit ) : 0;
  const isEndReached = size === totalPages;

  const handleLoadMore = useCallback(() => { 
    setSize((previousSize) => previousSize + 1);
  }, [setSize]); 

  const onClickSearch = useCallback(() => {
    const searchInput = document.getElementById(searchBarId);
    setSearch(searchInput.value);
  }, []);

  const clearSearch = useCallback(() => {
    const searchInput = document.getElementById(searchBarId);
    searchInput.value = ""; 
    setSearch("");
  }, []);

  const editProductVisibility = useCallback(async (productId, boolean) => {
    const [error] = await editShowInHome(productId, boolean);

    if (error) {
      setAlert({ status: "error", message: error.message });
      setShowAlert(true);

      return;
    }
  
    setSize(1);
    refreshProducts();
  }, [setSize, refreshProducts]);

  useEffect(() => {
    setSize(1); 
  }, [search, setSize]);

  return (
    <div className={styles.container}>

      <BackButton setShowModal={setShowModal} />

      <p className={styles.pageTitle}>All products</p>

      <CustomSearchBar
        id={searchBarId}
        placeholder={"Search a product"}
        size={"large"}
        onPressEnter={setSearch}
        onPressSearch={() => onClickSearch()}
        onPressDelete={() => clearSearch()}
      />

      <div className={styles.productContainer}>
        {!isLoading ? (
          products.map((product, index) => {
            const image = product.productImages[0];

            return (
              <div
                key={index}
                className={styles.productCard}
              >
                <div className={classnames(
                  styles.productImageWrapper,
                  product.showInHome ? styles.showedInHome : ""
                )}>
                  <ImageWithFallback
                    className={styles.productImage}
                    alt={"Product image"}
                    src={image.imageUrl ? image.imageUrl : `${process.env.AWS_BUCKET_URL}${image.imageSrc}`}
                    fallbackSrc={`/placeholder-image.png`}
                    fill
                  />
                </div>

                <p className={styles.productTitle}>{product.name}</p>

                <div className={styles.cardOverlay}>
                  <IconButton
                    Icon={product.showInHome ? EyeSlashIcon : EyeIcon}
                    tooltip={product.showInHome ? "Hide product" : "Show product"}
                    onPress={() => editProductVisibility(product.id, product.showInHome ? false : true)}
                  />
                </div>
              </div>
            );
          })
        ): (
          <Loader />
        )}
      </div>

      {(!isLoading && products.length > 0) && (
        isEndReached ? (
          <p>No more products</p>
        ) : (
          <>
            {isValidating ? (
              <Loader />
            ) : (
              <Button
                onClick={() => handleLoadMore()}
              > 
                See more
              </Button>
            )}
          </>
        )
      )}

      <CustomAlert
        alert={alert}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
    </div>
  );
};

export default ProductToShowList;