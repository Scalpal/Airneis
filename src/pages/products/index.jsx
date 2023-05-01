import Banner from "@/web/components/Banner";
import styles from "@/styles/products.module.css";
import DetailedProductCard from "@/web/components/DetailedProductCard";
import { useCallback, useState } from "react";
import ProductFilterMenu from "@/web/components/ProductFilterMenu";
import ParamBadge from "@/web/components/ParamBadge";

const categoryProducts = [
  {
    id: 1,
    name: "Chaise moderne en bois de hêtre",
    type: "bois",
    description:
      "Chaises noir en bois de hêtre centenaire d'Himalayad,zkdanaldza nzdn lkdn jlkdznland kzalzdnalkd nkldzndzlaknalkn",
    price: 200,
    stock: 25,
    picture: "/meuble-2.jpeg",
    materials: ["métal","acier","fer"],
  },
  {
    id: 2,
    name: "chaise",
    type: "bois",
    price: 29,
    stock: 25,
    picture: "/meuble-2.jpeg",
    materials: ["métal","acier","fer"],
  },
  {
    id: 3,
    name: "chaise",
    type: "bois",
    description: "Chaises noir en bois de hêtre centenaire d'Himalaya",
    price: 87,
    stock: 25,
    picture: "/meuble-2.jpeg",
    materials: ["métal","acier","fer"],
  },
  {
    id: 4,
    name: "chaise",
    type: "bois",
    price: 129,
    stock: 25,
    picture: "/meuble-2.jpeg",
    materials: ["métal","acier","fer"],
  },
  {
    id: 5,
    name: "chaise",
    type: "bois",
    description: "Chaises noir en bois de hêtre centenaire d'Himalaya",
    price: 987,
    stock: 25,
    picture: "/meuble-2.jpeg",
    materials: ["métal","acier","fer"],
  },
  {
    id: 6,
    name: "chaise",
    type: "bois",
    price: 100,
    stock: 25,
    picture: "/meuble-2.jpeg",
    materials: ["métal","acier","fer"],
  },
];



const Products = () => {

  const [queryParams, setQueryParams] = useState({
    priceMin: 0,
    priceMax: 0,
    materials: [],
    onlyInStock: false,
    categories: []
  });
  const [appliedQueryParams, setAppliedQueryParams] = useState({
    priceMin: 0,
    priceMax: 0,
    materials: [],
    stock: [],
    categories: []
  }); 

  const handleQueryParamsFilters = useCallback((key, { name, value }) => {
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

    setQueryParams({
      ...queryParams,
      [key]: queryParams[key].findIndex((elt) => elt.value === value) === -1 ?
        [...queryParams[key], { name, value }] :
        [...queryParams[key].filter(elt => elt.value !== value)]
    });
  }, [queryParams, setQueryParams]);


  {/* const createQueryString = useCallback(() => {
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

  useEffect(() => {
    console.log(createQueryString()); 
  }, [appliedQueryParams, createQueryString]); */}
  
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
            handleQueryParamsFilters={handleQueryParamsFilters}
          />
          
          <ParamBadge
            appliedQueryParams={appliedQueryParams}
            queryKey={"categories"}
            handleQueryParamsFilters={handleQueryParamsFilters}
          />
        </div>

        <div className={styles.content}>

          <ProductFilterMenu
            queryParams={queryParams}
            setAppliedQueryParams={setAppliedQueryParams}
            handleQueryParamsFilters={handleQueryParamsFilters}
          />

          <section className={styles.productsContainer}>
            {categoryProducts.map((product,index) => (
              <DetailedProductCard key={index} product={product} />
            ))}
          </section>
        </div>

      </main>
    </>
  );
};

Products.isPublic = true;
export default Products;
