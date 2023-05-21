import Banner from "@/web/components/Banner";
import styles from "@/styles/products.module.css";
import DetailedProductCard from "@/web/components/DetailedProductCard";
import { useEffect, useState } from "react";
import ProductFilterMenu from "@/web/components/ProductFilterMenu";
import IndexPages from "@/web/components/IndexPages";
import useAppContext from "@/web/hooks/useAppContext";
import { useRouter } from "next/router";
import routes from "@/web/routes";
import deepmerge  from "deepmerge";

const Products = () => {
  const { actions: { productsViewer } } = useAppContext();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(1);
  const [count, setCount] = useState(0);
  const [queryParams, setQueryParams] = useState({
    priceMin: 0,
    priceMax: 0,
    materials: [],
    onlyInStock: false,
    categories: [],
  });
  const [appliquedQueryParams, setAppliquedQueryParams] = useState(queryParams);
  const { page } = router.query;
  const productsPerPage = 20;
  const startIndex = ((page - 1) * productsPerPage) + 1;
  const endIndex = ((page - 1) * productsPerPage) + productsPerPage;
  useEffect(() => {
    const fetchData = async () => {
      const values = deepmerge({ index, range: productsPerPage },queryParams);
      try {
        const data = await productsViewer(values);
        const { result,meta } = data;
        setProducts(result);
        setCount(meta.count.toLocaleString());
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
    page ? setIndex(Number.parseInt(page)) : setIndex(1);
  }, [index, page, productsViewer, queryParams]);


  return (
    <>
      <Banner title={"Products"} />

      <main className={styles.main}>
        <input type="text" className={styles.input} />

        <div className={styles.indexProducts}>
          <span>{startIndex} - {endIndex} on {count > 100000 ? `plus de ${count}` : count} products</span>
        </div>

        <div className={styles.content}>
          <ProductFilterMenu
            appliquedQueryParams={appliquedQueryParams}
            setIndex={setIndex}
            setQueryParams={setQueryParams}
            setAppliquedQueryParams={setAppliquedQueryParams}
          />

          <section className={styles.productsContainer}>
            {products.map((product, index) => (
              <DetailedProductCard key={index} product={product} />
            ))}
          </section>
        </div>
      </main>
      <IndexPages count={count} page={index} range={productsPerPage} redirectLink={routes.params.products}/>
    </>
  );
};

Products.isPublic = true;
export default Products;

