import styles from "@/styles/components/ProductFilterMenu.module.css"
import CollapseMenu from "./CollapseMenu"
import CheckboxItem from "./CheckboxItem"
import Button from "./Button"
import { useCallback, useEffect, useState } from "react"
import { classnames } from "@/pages/_app"
import useAppContext from "@/web/hooks/useAppContext"

const ProductFilterMenu = (props) => {
  const {
    appliquedQueryParams,
    setPage,
    setQueryParams,
    setAppliquedQueryParams,
  } = props

  const {
    services: { getCategories, getMaterials },
  } = useAppContext()
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState([])
  const [materials, setMaterials] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const [categoriesError, categoriesResult] = await getCategories()
      const [materialsError, materialsResult] = await getMaterials()

      if (categoriesError || materialsError) {
        setError(true)

        return
      }

      setCategories(categoriesResult)
      setMaterials(materialsResult)
    }
    // console.error(error);

    fetchData()

    document.body.style.position = isOpen ? "fixed" : "initial"
  }, [getCategories, getMaterials, isOpen])

  const handleChangeQueryParamsFilters = useCallback(
    (values) => {
      setAppliquedQueryParams((prevValues) => {
        const { name, value, checked } = values

        if (name === "categories" || name === "materials") {
          if (checked) {
            return { ...prevValues, [name]: [...prevValues[name], value] }
          } else {
            const updatedArray = prevValues[name].filter(
              (item) => item !== value
            )

            return { ...prevValues, [name]: updatedArray }
          }
        }

        return { ...prevValues, [name]: value }
      })
    },
    [setAppliquedQueryParams]
  )

  const isValueChecked = useCallback(
    (values) => {
      return appliquedQueryParams[values.name].includes(values.id)
    },
    [appliquedQueryParams]
  )

  const handleQueryParamsFilters = useCallback(() => {
    setPage(1)
    setQueryParams(appliquedQueryParams)
  }, [appliquedQueryParams, setPage, setQueryParams])

  const handleResetQueryParamsFilters = useCallback(() => {
    const defaultQueryParams = {
      priceMin: null,
      priceMax: null,
      materials: [],
      onlyInStock: false,
      categories: [],
    }
    setAppliquedQueryParams((prevValues) => {
      return { ...defaultQueryParams, searchProduct: prevValues.searchProduct }
    })
    setQueryParams((prevValues) => {
      return { ...defaultQueryParams, searchProduct: prevValues.searchProduct }
    })
  }, [setAppliquedQueryParams, setQueryParams])

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

      <div
        className={classnames(
          styles.filterMenu,
          isOpen ? styles.open : styles.closed
        )}
      >
        <p className={styles.menuTitle}>Filters</p>

        <div className={styles.priceRangeWrapper}>
          <div className={styles.labelInputWrapper}>
            <label>Min price $</label>
            <input
              type="number"
              name="priceMin"
              value={
                !appliquedQueryParams.priceMin
                  ? ""
                  : appliquedQueryParams.priceMin
              }
              min={0}
              onChange={(event) =>
                handleChangeQueryParamsFilters({
                  name: "priceMin",
                  value: event.target.value,
                })
              }
            />
          </div>

          <div className={styles.labelInputWrapper}>
            <label>Max price $</label>
            <input
              type="number"
              name="priceMax"
              value={
                !appliquedQueryParams.priceMax
                  ? ""
                  : appliquedQueryParams.priceMax
              }
              min={0}
              onChange={(event) =>
                handleChangeQueryParamsFilters({
                  name: "priceMax",
                  value: event.target.value,
                })
              }
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
              defaultChecked={isValueChecked({ id, name: "categories" })}
              onChangeEvent={handleChangeQueryParamsFilters}
            />
          ))}
        </CollapseMenu>

        <CollapseMenu title="materials" key={"materials"}>
          {materials.map(({ name, id }, index) => (
            <CheckboxItem
              key={index}
              group="materials"
              label={name}
              id={`materials-${index}`}
              value={id}
              defaultChecked={isValueChecked({ id, name: "materials" })}
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
