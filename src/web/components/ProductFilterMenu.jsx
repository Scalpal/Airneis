import styles from "@/styles/components/ProductFilterMenu.module.css"; 
import CollapseMenu from "./CollapseMenu";
import CheckboxItem from "./CheckboxItem";
import Button from "./Button";
import { useEffect, useState } from "react";
import { classnames } from "@/pages/_app";

const materials = [
  {
    name: "Wood",
    id: 1
  },
  {
    name: "Steel",
    id: 2,
  },
  {
    name: "Plastic",
    id: 3,
  },
  {
    name: "Glass",
    id: 4,
  },
  {
    name: "Copper",
    id: 5,
  }
];

const categories = [
  {
    name: "Bed",
    id: 1
  },
  {
    name: "Table",
    id: 2,
  }, {
    name: "Chair",
    id: 3
  }

];


const ProductFilterMenu = (props) => {

  const { handleQueryParamsFilters, queryParams, setQueryParams, setAppliedQueryParams } = props; 

  const [isOpen, setIsOpen] = useState(false); 

  useEffect(() => {
    isOpen ? document.body.style.position = "fixed" : document.body.style.position = "initial"; 
  }, [isOpen, setIsOpen]);

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
          <div className={styles.labelInputWrapper}>
            <label>Min price $</label>
            <input
              type="number"
              min={0}
              onChange={(e) => handleQueryParamsFilters("priceMin", { name: "priceMin", value: e.target.value})}
            />
          </div>

          <div className={styles.labelInputWrapper}>
            <label>Max price $</label>
            <input
              type="number"
              min={0}
              onChange={(e) => handleQueryParamsFilters("priceMax", { name: "priceMax", value: e.target.value})}
            />
          </div>

        </div>

        <CollapseMenu title="Categories" key={"categories"}>
          {categories.map(({ name, id }, index) => (
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
          {materials.map(({ name, id }, index) => (
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
            onClick={() => setQueryParams({
              priceMin: 0,
              priceMax: 0,
              materials: [],
              stock: [],
              categories: []
            })}
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