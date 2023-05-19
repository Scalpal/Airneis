import Banner from "@/web/components/Banner";
import styles from "@/styles/products.module.css";
import DetailedProductCard from "@/web/components/DetailedProductCard";
import { useCallback, useEffect, useState } from "react";
import ProductFilterMenu from "@/web/components/ProductFilterMenu";
import ParamBadge from "@/web/components/ParamBadge";
import IndexPages from "@/web/components/IndexPages";
import useAppContext from "@/web/hooks/useAppContext";
import { useRouter } from "next/router";

//   {
//     id: 1,
//     name: "Modern beechwood chair",
//     type: "Wood",
//     description: "Black chairs made of 100 year old Himalayan beech wood",
//     price: 200,
//     stock: 25,
//     picture: "/meuble-2.jpeg",
//     materials: ["metal", "steel", "iron"],
//   },


const Products = () => {
  const { actions: { productsViewer } } = useAppContext();
  const [error,setError] = useState(null);
  const [products,setProducts] = useState([]);
  const [index,setIndex] = useState(1);
  const [count,setCount] = useState(0);
  const router = useRouter();
  const { page } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await productsViewer(index);
        const { result, meta } = data;
        setProducts(result);
        setCount(meta.count);
      } catch (err) {
        setError(err);
      }
    };
    
    fetchData();
    page ? setIndex(Number.parseInt(page)) : setIndex(1);
    
  },[index, page, productsViewer]);
  console.log(error);
  
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
            {products.map((product, index) => (
              <DetailedProductCard key={index} product={product} />
            ))}
          </section>
        </div>
      </main>
      <IndexPages count={count} page={index}/>
    </>
  );
};

Products.isPublic = true;
export default Products;

