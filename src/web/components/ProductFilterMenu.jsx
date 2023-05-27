import styles from "@/styles/components/ProductFilterMenu.module.css"; 
import CollapseMenu from "./CollapseMenu";
import CheckboxItem from "./CheckboxItem";
import Button from "./Button";
import { useCallback, useEffect, useState } from "react";
import { classnames } from "@/pages/_app";
import { useGetMaterials } from "../hooks/useGetMaterials";
import { useGetCategories } from "../hooks/useGetCategories";
import InputRange from "./InputRange";

const ProductFilterMenu = (props) => {
  const { handleQueryParamsFilters, setQueryParams, queryParams, setAppliedQueryParams } = props; 
  const { materialsData, materialsIsLoading } = useGetMaterials(); 
  const { categoriesData, categoriesIsLoading } = useGetCategories(); 

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

  return (
    <>
      <button
        className={styles.filterButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        F<br />
        I<br/>
        L<br/>
        T<br/>
        E<br/>
        R<br/>
        S<br/>
      </button>
      
      <div className={classnames(
        styles.filterMenu,
        isOpen ? styles.open : styles.closed
      )}>
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

        <CollapseMenu title="Categories" key={"categories"}>
          {!categoriesIsLoading && categoriesData.map(({ name, id }, index) => (
            <CheckboxItem
              key={index}
              name={name}
              value={id}
              queryParams={queryParams}
              queryKey={"categories"}
              handleQueryParamsFilters={handleQueryParamsFilters}
            />
          ))}
        </CollapseMenu>

        <CollapseMenu title="Materials" key={"materials"}>
          {!materialsIsLoading && materialsData.map(({ name, id }, index) => (
            <CheckboxItem
              key={index}
              name={name}
              value={id}
              queryParams={queryParams}
              queryKey={"materials"}
              handleQueryParamsFilters={handleQueryParamsFilters}
            />
          ))}
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

        <div className={styles.buttonsWrapper}>
          <Button
            variant="outlined"
            onClick={() => handleResetButton()}
          >
            Reset
          </Button>

          <Button
            variant="contained"
            onClick={() => setAppliedQueryParams(queryParams)}
          >
            Apply
          </Button>
        </div>

        <div className={styles.closeButton}>
          <Button
            onClick={() => { setIsOpen(false); }}
          >
            Close
          </Button>
        </div>

      </div>
    </>

  );
};

export default ProductFilterMenu;