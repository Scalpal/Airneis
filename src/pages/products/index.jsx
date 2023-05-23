import Banner from "@/web/components/Banner";
import styles from "@/styles/products.module.css";
import DetailedProductCard from "@/web/components/DetailedProductCard";
import { useCallback, useEffect, useState } from "react";
import ProductFilterMenu from "@/web/components/ProductFilterMenu";
import ParamBadge from "@/web/components/ParamBadge";
import useGetProducts from "@/web/hooks/useGetProducts";
import Button from "@/web/components/Button";



const Products = () => {
  const { data, error, isLoading, isValidating, size, setSize } = useGetProducts(); 

  const products = data && data.reduce((acc, { products }) => [...acc, ...products], []);

  const [queryParams, setQueryParams] = useState({
    priceMin: 0,
    priceMax: 0,
    materials: [],
    onlyInStock: false,
    categories: [],
  });

  const [appliedQueryParams, setAppliedQueryParams] = useState({
    priceMin: 0,
    priceMax: 0,
    materials: [],
    stock: [],
    categories: [],
  });

  const handleQueryParamsFilters = useCallback(
    (key, { name, value }) => {
      if (typeof queryParams[key] === "boolean") {
        setQueryParams({
          ...queryParams,
          [key]: !value,
        });

        return;
      }

      if (typeof queryParams[key] === "number") {
        setQueryParams({
          ...queryParams,
          [key]: Number.parseInt(value),
        });

        return;
      }

      setQueryParams({
        ...queryParams,
        [key]:
          queryParams[key].findIndex((elt) => elt.value === value) === -1
            ? [...queryParams[key], { name, value }]
            : [...queryParams[key].filter((elt) => elt.value !== value)],
      });
    },
    [queryParams, setQueryParams]
  );

  const handleAppliedQueryParams = useCallback(
    (key, { name, value }) => {
      setQueryParams({
        ...queryParams,
        [key]:
          queryParams[key].findIndex((elt) => elt.value === value) === -1
            ? [...queryParams[key], { name, value }]
            : [...queryParams[key].filter((elt) => elt.value !== value)],
      });

      setAppliedQueryParams({
        ...appliedQueryParams,
        [key]:
          appliedQueryParams[key].findIndex((elt) => elt.value === value) === -1
            ? [...appliedQueryParams[key], { name, value }]
            : [...appliedQueryParams[key].filter((elt) => elt.value !== value)],
      });
    },
    [appliedQueryParams, setAppliedQueryParams, queryParams]
  );

  const createQueryString = useCallback(() => {
    let queryString = "?";

    Object.entries(appliedQueryParams).map(([key, value]) => {
      if (Array.isArray(value)) {
        value.map((param) => (
          queryString += key + "=" + param.value + "&"
        ));
      }

      if (typeof value === "number" && value > 0) {
        queryString += key + "=" + value + "&";
      }

      if (typeof value === "boolean") {
        queryString += key + "=" + value + "&";
      }
    });

    return queryString;

  }, [appliedQueryParams]);

  const handleLoadMore = useCallback(() => { 
    setSize(size + 1,);
  }, [size, setSize]);
  
  useEffect(() => {
    console.log(createQueryString()); 
  }, [appliedQueryParams, createQueryString]); 

  useEffect(() => {
    if (data !== undefined && !isLoading) {
      console.log("data: ", data);
    }
  }, [data, isLoading]);

  return (
    <>
      <Banner title={"Products"} />

      <main className={styles.main}>
        <input type="text" className={styles.input} />

        {/* It will show all the active filters with badges */}
        <div className={styles.filterBadgesContainer}>
          <ParamBadge
            appliedQueryParams={appliedQueryParams}
            queryKey={"materials"}
            handleAppliedQueryParams={handleAppliedQueryParams}
          />

          <ParamBadge
            appliedQueryParams={appliedQueryParams}
            queryKey={"categories"}
            handleAppliedQueryParams={handleAppliedQueryParams}
          />
        </div>

        <div className={styles.content}>
          <ProductFilterMenu
            queryParams={queryParams}
            setQueryParams={setQueryParams}
            setAppliedQueryParams={setAppliedQueryParams}
            handleQueryParamsFilters={handleQueryParamsFilters}
          />

          <section className={styles.productsContainer}>
            
            {data && products.map((product, index) => (
              <DetailedProductCard key={index} product={product} />
            ))}

            <Button
              onClick={() => handleLoadMore()}
            > 
              See more
            </Button>
          </section>
        </div>
      </main>
    </>
  );
};

Products.isPublic = true;
export default Products;
