import Banner from "@/web/components/Banner";
import styles from "@/styles/products.module.css";
import DetailedProductCard from "@/web/components/DetailedProductCard";
import { useCallback, useState } from "react";
import ProductFilterMenu from "@/web/components/ProductFilterMenu";
import ParamBadge from "@/web/components/ParamBadge";

const categoryProducts = [
  {
    id: 1,
    name: "Modern beechwood chair",
    type: "Wood",
    description: "Black chairs made of 100 year old Himalayan beech wood",
    price: 200,
    stock: 25,
    picture: "/meuble-2.jpeg",
    materials: ["metal", "steel", "iron"],
  },
  {
    id: 2,
    name: "Chair",
    type: "Wood",
    price: 29,
    stock: 25,
    picture: "/meuble-2.jpeg",
    materials: ["metal", "steel", "iron"],
  },
  {
    id: 3,
    name: "Chair",
    type: "Wood",
    description: "Black chairs made of 100 year old Himalayan beech wood",
    price: 87,
    stock: 25,
    picture: "/meuble-2.jpeg",
    materials: ["metal", "steel", "iron"],
  },
  {
    id: 4,
    name: "Chair",
    type: "Wood",
    price: 129,
    stock: 25,
    picture: "/meuble-2.jpeg",
    materials: ["metal", "steel", "iron"],
  },
  {
    id: 5,
    name: "Chair",
    type: "Wood",
    description: "Black chairs made of 100 year old Himalayan beech wood",
    price: 987,
    stock: 25,
    picture: "/meuble-2.jpeg",
    materials: ["metal", "steel", "iron"],
  },
  {
    id: 6,
    name: "Chair",
    type: "Wood",
    price: 100,
    stock: 25,
    picture: "/meuble-2.jpeg",
    materials: ["metal", "steel", "iron"],
  },
];

const Products = () => {
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

  {
    /* const createQueryString = useCallback(() => {
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
  }, [appliedQueryParams, createQueryString]); */
  }

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
            {categoryProducts.map((product, index) => (
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
