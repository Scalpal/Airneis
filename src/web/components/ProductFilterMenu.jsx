import styles from "@/styles/components/ProductFilterMenu.module.css"; 
import CollapseMenu from "./CollapseMenu";
import CheckboxItem from "./CheckboxItem";
import Button from "./Button";
import { useCallback, useEffect, useState } from "react";
import { classnames } from "@/pages/_app";
import { useGetMaterials } from "../hooks/useGetMaterials";
import { useGetCategories } from "../hooks/useGetCategories";
import InputRange from "./InputRange";
import RadioItem from "./RadioItem";

const ProductFilterMenu = (props) => {
  const { handleQueryParamsFilters, setQueryParams, queryParams, setAppliedQueryParams } = props; 
  const { materialsData, materialsIsLoading, materialsError } = useGetMaterials(); 
  const { categoriesData, categoriesIsLoading, categoriesError } = useGetCategories(); 

  const [isOpen, setIsOpen] = useState(false); 

  useEffect(() => {
    isOpen ? document.body.style.position = "fixed" : document.body.style.position = "initial"; 
  }, [isOpen, setIsOpen]);

  const handleResetButton = useCallback(() => {
    setQueryParams({
      priceMin: 0,
      priceMax: 0,
      materials: [],
      onlyInStock: false,
      categories: []
    });

    setAppliedQueryParams({
      priceMin: 0,
      priceMax: 0,
      materials: [],
      onlyInStock: false,
      categories: []
    });
  }, [setQueryParams, setAppliedQueryParams]);

  const handlePriceLowToHigh = useCallback(() => {
    setQueryParams({
      ...queryParams,
      order: "asc",
      orderField: "price"
    });
  }, [queryParams, setQueryParams]);

  const handlePriceHighToLow = useCallback(() => {
    setQueryParams({
      ...queryParams,
      order: "desc",
      orderField: "price"
    });
  }, [queryParams, setQueryParams]);

  const handleNoSort = useCallback(() => {
    setQueryParams({
      ...queryParams,
      order: "",
      orderField: ""
    });
  }, [queryParams, setQueryParams]);

  const handleSort = useCallback((value) => {
    if (value === "1") {
      handleNoSort();

      return;
    }

    if (value === "2") {
      handlePriceLowToHigh();
      
      return;
    }

    handlePriceHighToLow();
    
    return;
  }, [handlePriceLowToHigh, handlePriceHighToLow, handleNoSort]); 

  const isValueChecked = useCallback((queryKey, value) => {
    const bool = queryParams[queryKey].findIndex((elt) => elt.value === value) === -1 ? false : true;

    return bool;
  }, [queryParams]);

  return (
    <>
      <button
        className={styles.filterButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        F<br />
        I<br />
        L<br />
        T<br />
        E<br />
        R<br />
        S<br />
      </button>
      
      <div className={classnames(
        styles.filterMenu,
        isOpen ? styles.open : styles.closed
      )}>
        <div
          className={styles.contentWrapper}
        >
          <p className={styles.menuTitle}>Filters</p>

          <div className={styles.priceRangeWrapper}>
            <InputRange
              label={"Price min"}
              currentValue={queryParams.priceMin}
              handler={(e) => handleQueryParamsFilters("priceMin", e.target.value)}
            />

            <InputRange
              label={"Price max"}
              currentValue={queryParams.priceMax}
              handler={(e) => handleQueryParamsFilters("priceMax", e.target.value)}
            />
          </div>

          <CollapseMenu title="Categories">
            {!categoriesIsLoading && !categoriesError && categoriesData.map(({ name, id }, index) => (
              <CheckboxItem
                key={index}
                name={name}
                value={id}
                checked={isValueChecked("categories", id)}
                onChange={() => handleQueryParamsFilters("categories", id, name)}
              />
            ))}
          </CollapseMenu>

          <CollapseMenu title="Materials">
            {!materialsIsLoading && !materialsError && materialsData.map(({ name, id }, index) => (
              <CheckboxItem
                key={index}
                name={name}
                value={id}
                checked={isValueChecked("materials", id)}
                onChange={() => handleQueryParamsFilters("materials", id, name)}
              />
            ))}
          </CollapseMenu>

          <CollapseMenu title="Sort by">
            <RadioItem
              label="No sort"
              name="sortOption"
              inputId="noSort"
              value={1}
              onChange={(e) => handleSort(e.target.value)}
              checked={queryParams.orderField === ""}
            />

            <RadioItem
              label="Price : low to high"
              name="sortOption"
              inputId="priceAsc"
              value={2}
              onClick={(e) => handleSort(e.target.value)}
              checked={queryParams.order === "asc" && queryParams.orderField === "price"}
            />

            <RadioItem
              label="Price : high to low"
              name="sortOption"
              inputId="priceDesc"
              value={3}
              onClick={(e) => handleSort(e.target.value)}
              checked={queryParams.order === "desc" && queryParams.orderField === "price"}
            />
          </CollapseMenu>

          <div>
            <p className={styles.categoryTitle}>Stocks</p>
            <CheckboxItem
              name={"In stock"}
              value={queryParams.onlyInStock}
              queryParams={queryParams}
              queryKey={"onlyInStock"}
              handleQueryParamsFilters={handleQueryParamsFilters}
            />
          </div>
        </div>

        <div className={styles.buttonsWrapper}>
          <Button
            variant="outlined"
            name="onlyInStock"
            onClick={handleResetQueryParamsFilters}
          >
            Reset
          </Button>

          <Button variant="contained" onClick={handleQueryParamsFilters}>
            Apply
          </Button>
        </div>

        <div className={styles.closeButton}>
          <Button
            onClick={() => {
              setIsOpen(false)
            }}
          >
            Close
          </Button>
        </div>
      </div>
    </>
  )
}

export default ProductFilterMenu
