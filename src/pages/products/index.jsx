import Banner from "@/web/components/Banner"
import styles from "@/styles/products.module.css"
import DetailedProductCard from "@/web/components/DetailedProductCard"
import SearchBar from "@/web/components/SearchBar"
import { useEffect, useState } from "react"
import ProductFilterMenu from "@/web/components/ProductFilterMenu"
import IndexPages from "@/web/components/pagination"
import useAppContext from "@/web/hooks/useAppContext"
import { useRouter } from "next/router"
import routes from "@/web/routes"
import deepmerge from "deepmerge"

const Products = () => {
  const {
    actions: { productsViewer },
  } = useAppContext()
  const router = useRouter()
  const [error, setError] = useState(null)
  const [products, setProducts] = useState([])
  const [index, setIndex] = useState(1)
  const [count, setCount] = useState(0)
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(0)
  const [queryParams, setQueryParams] = useState({
    priceMin: 0,
    priceMax: 0,
    materials: [],
    onlyInStock: false,
    categories: [],
    searchProduct: null,
  })
  const [appliquedQueryParams, setAppliquedQueryParams] = useState(queryParams)
  const { page } = router.query
  const productsPerPage = 5
  useEffect(() => {
    const fetchData = async () => {
      const values = deepmerge({ index, range: productsPerPage }, queryParams)

      try {
        const data = await productsViewer(values)
        const { result, meta } = data
        setProducts(result)
        setCount(meta.count.toLocaleString())
      } catch (err) {
        setError(err)
      }
    }
    fetchData()

    setIndex(page ? Number.parseInt(page) : 1)

    setStartIndex((index - 1) * productsPerPage + 1)
    const indexEnd =
      (index - 1) * productsPerPage + productsPerPage < count
        ? (index - 1) * productsPerPage + productsPerPage
        : count
    setEndIndex(indexEnd)
  }, [count, index, page, productsViewer, queryParams])

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

  const searchStateAction = (value) => {
    setAppliquedQueryParams((prevValues) => {
      return { ...prevValues, searchProduct: value }
    })
    setQueryParams((prevValues) => {
      return { ...prevValues, searchProduct: value }
    })
  }

  return (
    <>
      <Banner title={"Products"} />

      <main className={styles.main}>
        <SearchBar searchStateAction={searchStateAction} />

        <div className={styles.indexProducts}>
          <span>
            {startIndex} - {endIndex} on{" "}
            {count > 100000 ? `plus de ${count}` : count} products
          </span>
        </div>

        <div className={styles.content}>
          <ProductFilterMenu
            appliquedQueryParams={appliquedQueryParams}
            setIndex={setIndex}
            setQueryParams={setQueryParams}
            setAppliquedQueryParams={setAppliquedQueryParams}
          />

          <section className={styles.productsContainer}>
            {categoryProducts.map((product, index) => (
            {products.map((product, index) => (
              <DetailedProductCard key={index} product={product} />
            ))}
          </section>
        </div>
      </main>
      <IndexPages
        count={count}
        page={index}
        range={productsPerPage}
        redirectLink={routes.params.products}
      />
    </>
  )
}

Products.isPublic = true
export default Products
