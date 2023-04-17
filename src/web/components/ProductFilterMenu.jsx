import styles from "@/styles/components/ProductFilterMenu.module.css"; 
import CollapseMenu from "./CollapseMenu";
import CheckboxItem from "./CheckboxItem";
import Button from "./Button";
import { useState } from "react";
import { classnames } from "@/pages/_app";

const materials = [
  {
    name: "Wood",
    value: "wood",
  },
  {
    name: "Steel",
    value: "steel",
  },
  {
    name: "Plastic",
    value: "plastic",
  },
  {
    name: "Glass",
    value: "glass",
  },
  {
    name: "Copper",
    value: "copper",
  }
];

const categories = [
  {
    name: "Bed",
    value: 1
  },
  {
    name: "Table",
    value: 2,
  }, {
    name: "Chair",
    value: 3
  }

];


const ProductFilterMenu = (props) => {

  const { handleQueryParamsFilters } = props; 

  const [isOpen, setIsOpen] = useState(false); 


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
            <input type="number" />
          </div>

          <div className={styles.labelInputWrapper}>
            <label>Max price $</label>
            <input type="number" />
          </div>

        </div>

        <CollapseMenu title="Categories" key={"categories"}>
          {categories.map(({ name, value }, index) => (
            <CheckboxItem
              key={index}
              name={name}
              value={value}
              queryKey={"categories"}
              handleQueryParamsFilters={handleQueryParamsFilters}
            />
          ))}
        </CollapseMenu>

        <CollapseMenu title="Materials" key={"materials"}>
          {materials.map(({ name, value }, index) => (
            <CheckboxItem
              key={index}
              name={name}
              value={value}
              queryKey={"materials"}
              handleQueryParamsFilters={handleQueryParamsFilters}
            />
          ))}
        </CollapseMenu>

        <div>
          <p className={styles.categoryTitle}>Stocks</p>
          <CheckboxItem
            name={"In stock"}
            value={"In stock"}
            queryKey={"stock"}
            handleQueryParamsFilters={handleQueryParamsFilters}
          />
        </div>

        <div className={styles.buttonsWrapper}>
          <Button
            variant="outlined"
          >
            Reset
          </Button>

          <Button
            variant="contained"
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