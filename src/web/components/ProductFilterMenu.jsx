import styles from "@/styles/components/ProductFilterMenu.module.css"; 
import CollapseMenu from "./CollapseMenu";
import CheckboxItem from "./CheckboxItem";
import Button from "./Button";
import { useCallback, useEffect, useState } from "react";
import { classnames } from "@/pages/_app";
import useAppContext from "@/web/hooks/useAppContext";




const ProductFilterMenu = (props) => {

  const { appliquedQueryParams,setIndex,setQueryParams,setAppliquedQueryParams } = props; 
  
  const { actions: { categoriesViewer, materialsViewer } } = useAppContext();
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResult = await categoriesViewer();
        const materialsResult = await materialsViewer();
  
        setCategories(categoriesResult.result);
        setMaterials(materialsResult.result);
      } catch (err) {
        setError(err);
      }
    };
    // console.error(error);
    
    fetchData();
    
    document.body.style.position = isOpen ? "fixed" : "initial";
  }, [categoriesViewer, isOpen, materialsViewer]);


  const handleChangeQueryParamsFilters = useCallback((values) => {
    setAppliquedQueryParams((prevValues) => {
      const { name,value,checked } = values;
      if (name === "categories" || name === "materials") {
        if (checked) {
          return { ...prevValues, [name]: [...prevValues[name], value] };
        } else {
          const updatedArray = prevValues[name].filter((item) => item !== value);
          return { ...prevValues, [name]: updatedArray };
        }
      }

      return { ...prevValues, [name]: value };
    });
  }, [setAppliquedQueryParams]);

  const isValueChecked = useCallback((values) => {
    return appliquedQueryParams[values.name].includes(values.id);
  }, [appliquedQueryParams]);

  const handleQueryParamsFilters = useCallback(() => {
    setIndex(1);
    setQueryParams(appliquedQueryParams);
  }, [appliquedQueryParams, setIndex, setQueryParams]);

  const handleResetQueryParamsFilters = useCallback(() => {
    const defaultQueryParams = {
      priceMin: 0,
      priceMax: 0,
      materials: [],
      onlyInStock: false,
      categories: [],
    };

    setAppliquedQueryParams(defaultQueryParams);
    setQueryParams(defaultQueryParams);
  },[setAppliquedQueryParams,setQueryParams]);


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
              name="priceMin"
              value={appliquedQueryParams.priceMin === 0 ? "" : appliquedQueryParams.priceMin}
              min={0}
              onChange={(event) => handleChangeQueryParamsFilters({name: "priceMin", value: event.target.value})}
            />
          </div>

          <div className={styles.labelInputWrapper}>
            <label>Max price $</label>
            <input
              type="number"
              name="priceMax"
              value={appliquedQueryParams.priceMax === 0 ? "" : appliquedQueryParams.priceMax}
              min={0}
              onChange={(event) => handleChangeQueryParamsFilters({name: "priceMax", value: event.target.value})}
            />
          </div>

        </div>

        <CollapseMenu title="Categories" key={"categories"}>
          {categories.map(({ name, id }, index) => (
            <CheckboxItem
              key={index}
              group="categories"
              label={name}
              id={`category-${index}`}
              value={id}
              defaultChecked={isValueChecked({ id,name: "categories" })}
              onChangeEvent={handleChangeQueryParamsFilters}
            />
          ))}
        </CollapseMenu>

        <CollapseMenu title="Materials" key={"materials"}>
          {materials.map(({ name, id }, index) => (
            <CheckboxItem
              key={index}
              group="materials"
              label={name}
              id={`materials-${index}`}
              value={id}
              defaultChecked={isValueChecked({id, name: "materials"})}
              onChangeEvent={handleChangeQueryParamsFilters}
            />
          ))}
        </CollapseMenu>

        <div>
          <p className={styles.categoryTitle}>Stocks</p>
          <CheckboxItem
            group={"onlyInStock"}
            id="stockCheckbox"
            value={appliquedQueryParams.onlyInStock}
            defaultChecked={appliquedQueryParams.onlyInStock}
            onChangeEvent={handleChangeQueryParamsFilters}
          />
        </div>

        <div className={styles.buttonsWrapper}>
          <Button
            variant="outlined"
            name="onlyInStock"
            onClick={handleResetQueryParamsFilters}
          >
            Reset
          </Button>

          <Button
            variant="contained"
            onClick={handleQueryParamsFilters}
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