import styles from "@/styles/components/ProductFilterMenu.module.css"; 
import CollapseMenu from "./CollapseMenu";
import CheckboxItem from "./CheckboxItem";
import Button from "./Button";

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

  const { handleQueryParamsFilters, setIsOpen } = props; 


  return (
    <>
      <p className={styles.filterTitle}>Filters</p>

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
            key={value}
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
            key={value}
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

      {setIsOpen && (
        <div className={styles.closeButton}>
          <Button
            onClick={() => { setIsOpen(false); }}
          >
            Close
          </Button>
        </div>
      )}

    </>
  );
};

export default ProductFilterMenu;