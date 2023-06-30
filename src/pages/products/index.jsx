import Banner from "@/web/components/Banner";
import styles from "@/styles/products.module.css";
import DetailedProductCard from "@/web/components/DetailedProductCard";
import { useCallback, useEffect, useState } from "react";
import ProductFilterMenu from "@/web/components/ProductFilterMenu";
import ParamBadge from "@/web/components/ParamBadge";
import useGetProducts from "@/web/hooks/useGetProducts";
import Button from "@/web/components/Button";
import Loader from "@/web/components/Loader";
import { MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";

const limit = 10; 

const Products = () => {
  const [queryParams, setQueryParams] = useState({
    priceMin: 0,
    priceMax: 0,
    materials: [],
    onlyInStock: false,
    categories: [],
    search: "",
    orderField: "",
    order: ""
  });

  const [appliedQueryParams, setAppliedQueryParams] = useState({
    priceMin: 0,
    priceMax: 0,
    materials: [],
    stock: [],
    categories: [],
    search: "",
    orderField: "",
    order: ""
  });

  const { data, error, isLoading, isValidating, size, setSize } = useGetProducts(appliedQueryParams); 
  const products = data && !error ? data.reduce((acc, { products }) => [...acc, ...products], []) : [];
  const totalPages = data && data[0] ? Math.ceil(data[0].count / limit ) : 0;
  const isEndReached = size === totalPages;

  const handleQueryParamsFilters = useCallback((key, value, name) => {
     if (typeof queryParams[key] === "boolean") {
      setQueryParams({
        ...queryParams,
        [key]: !value
      });  
      
      return;
    }

    if (typeof queryParams[key] === "number") {
      setQueryParams({
        ...queryParams,
        [key]: Number.parseInt(value)
      });

    return;
    }

    if (typeof queryParams[key] === "string") {
      setQueryParams({
        ...queryParams,
        [key]: value
      });

      return; 
    }

    // If the value at the specific key is an array
    setQueryParams({
      ...queryParams,
      [key]:
        queryParams[key].findIndex((elt) => elt.value === value) === -1 // If value not found
          ? [...queryParams[key], { name, value }]
          : [...queryParams[key].filter((elt) => elt.value !== value)]
    });
  }, [queryParams, setQueryParams]);

  const handleAppliedQueryParams = useCallback((key, value, name) => {
    if (typeof queryParams[key] === "boolean") {
      setAppliedQueryParams({
        ...queryParams,
        [key]: !value
      });
      
      return;
    }

    if (typeof appliedQueryParams[key] === "string") {
      setAppliedQueryParams({
        ...appliedQueryParams,
        [key]: value
      });
      
      return; 
    }

    if (typeof queryParams[key] === "number") {
      setAppliedQueryParams({
        ...queryParams,
        [key]: Number.parseInt(value)
      });
      
      return;
    }

    // If the value at the specific key is an array
    setAppliedQueryParams({
      ...appliedQueryParams,
      [key]:
        appliedQueryParams[key].findIndex((elt) => elt.value === value) === -1
          ? [...appliedQueryParams[key], { name, value }]
          : [...appliedQueryParams[key].filter((elt) => elt.value !== value)]
    });
  }, [appliedQueryParams, setAppliedQueryParams, queryParams]);

  const handleLoadMore = useCallback(() => { 
    setSize((previousSize) => previousSize + 1);
  }, [setSize]); 

  const handleNoSort = useCallback(() => {
    setAppliedQueryParams({
      ...queryParams,
      order: "",
      orderField: ""
    });
  }, [queryParams, setAppliedQueryParams]);

  useEffect(() => {
    const searchInput = document.getElementById("searchInput");

    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        setAppliedQueryParams((prevState) => ({
          ...prevState,
          search: queryParams.search
        }));
      }
    };
    searchInput.addEventListener("keydown", handleKeyDown);

    return () => {
      searchInput.removeEventListener("keydown", handleKeyDown);
    };
  }, [queryParams, setQueryParams, appliedQueryParams, handleAppliedQueryParams]);

  useEffect(() => {
    setSize(1); 
  }, [appliedQueryParams, setSize]);

  useEffect(() => {
    setQueryParams(appliedQueryParams);
  }, [appliedQueryParams]);

  return (
    <>
      <Banner />

      <main className={styles.main}>
        
        <div className={styles.customInputWrapper}>
          <button className={styles.button}>
            <MagnifyingGlassIcon className={styles.icons} />
          </button>
          
          <input
            id={"searchInput"}
            type="text"
            value={queryParams.search}
            className={styles.input}
            placeholder={"Red chair made with oak wood"}
            onChange={(e) => handleQueryParamsFilters("search", e.target.value)}
          />

          <button
            className={styles.button}
            onClick={() => handleQueryParamsFilters("search", "")}
          >
            <XMarkIcon className={styles.icons} />
          </button>
        </div>
        
        {/* It will show all the active filters with badges */}
        <div className={styles.filterBadgesContainer}>
          {appliedQueryParams.orderField !== "" && (
            <ParamBadge
              label={"Sort by"}
              appliedQueryParams={appliedQueryParams}
              queryKey={"order"}
              handleAppliedQueryParams={handleNoSort}
            />
          )}

          {appliedQueryParams.priceMin !== 0 &&
            <ParamBadge
              label={"Price min"}
              appliedQueryParams={appliedQueryParams}
              queryKey={"priceMin"}
              handleAppliedQueryParams={handleAppliedQueryParams}
            />
          }

          {appliedQueryParams.priceMax !== 0 &&
            <ParamBadge
              label={"Price max"}
              appliedQueryParams={appliedQueryParams}
              queryKey={"priceMax"}
              handleAppliedQueryParams={handleAppliedQueryParams}
            />
          }

          <ParamBadge
            label={"Material"}
            appliedQueryParams={appliedQueryParams}
            queryKey={"materials"}
            handleAppliedQueryParams={handleAppliedQueryParams}
          />

          <ParamBadge
            label={"Category"}
            appliedQueryParams={appliedQueryParams}
            queryKey={"categories"}
            handleAppliedQueryParams={handleAppliedQueryParams}
          />

          {appliedQueryParams.onlyInStock && (
            <ParamBadge
              label={"In stock"}
              appliedQueryParams={appliedQueryParams}
              queryKey={"onlyInStock"}
              handleAppliedQueryParams={handleAppliedQueryParams}
            />
          )}
        </div>

        <div
          id="productContent"
          className={styles.content}
        >
          <ProductFilterMenu
            queryParams={queryParams}
            setQueryParams={setQueryParams}
            setAppliedQueryParams={setAppliedQueryParams}
            handleQueryParamsFilters={handleQueryParamsFilters}
          />

          <div className={styles.rightContent}>
            {!isLoading ? ( 
              (data && !error && products.length > 0) ? (
                <section className={styles.productsContainer}>
                  {!isLoading ? (
                    products.map((product, index) => (
                      <DetailedProductCard key={index} product={product} />
                    ))
                  ) : (
                    <Loader />
                  )}
                </section>
              ): (
                <div className={styles.noProductsContainer}>
                  <ShoppingBagIcon className={styles.productIcon} />
                    <p>Sorry !</p>
                    {appliedQueryParams.search.length > 0 ? (
                      <p>
                        There is no products found for the search <span className={styles.searchTerm}>&quot;{appliedQueryParams.search}&quot;</span>.
                      </p>
                    ) : (
                      <p>No products found</p>
                    )}
                </div>
              )
            ) : (
              <Loader />
            )}

            <div className={styles.buttonWrapper}>
              <span className={styles.emptySpace}></span>
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
            </div>
          </div>
        </div>
      </main>
    </>
  );
};


export default Products;
