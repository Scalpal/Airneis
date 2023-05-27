import Banner from "@/web/components/Banner"
import styles from "@/styles/products.module.css"
import DetailedProductCard from "@/web/components/DetailedProductCard"
import SearchBar from "@/web/components/SearchBar"
import { useEffect, useState } from "react"
import ProductFilterMenu from "@/web/components/ProductFilterMenu"
import useAppContext from "@/web/hooks/useAppContext"
import { useRouter } from "next/router"
import deepmerge from "deepmerge"

const Products = () => {
  const {
    services: { getProducts },
  } = useAppContext()
  const router = useRouter()
  const [error, setError] = useState(null)
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(0)
  const [queryParams, setQueryParams] = useState({
    priceMin: null,
    priceMax: null,
    materials: [],
    onlyInStock: false,
    categories: [],
    search: null,
  })
  const [appliquedQueryParams, setAppliquedQueryParams] = useState(queryParams)
  const limit = 20
  const { index } = router.query
  useEffect(() => {
    const fetchData = async () => {
      const values = deepmerge({ page, limit }, queryParams)

      const [err, data] = await getProducts(values)

      if (err) {
        setError(err)

        return
      }

      const { result, meta } = data
      setProducts(result)
      setCount(meta.count.toLocaleString())
    }
    fetchData()

    setPage(index ? Number.parseInt(index) : 1)

    setEndIndex(
      (page - 1) * limit + limit < count ? (page - 1) * limit + limit : count
    )
    setStartIndex((page - 1) * limit + 1)
  }, [count, getProducts, index, queryParams, limit, page])

  const searchStateAction = (value) => {
    setAppliquedQueryParams((prevValues) => {
      return { ...prevValues, search: value }
    })
    setQueryParams((prevValues) => {
      return { ...prevValues, search: value }
    })
  }

  return (
    <>
      <Banner title={"Products"} />

      <main className={styles.main}>
        <SearchBar searchStateAction={searchStateAction} />

        <div className={styles.indexProducts}>
          <span>
            {endIndex > 0 ? startIndex : 0} - {endIndex} on{" "}
            {count > 100000 ? `plus de ${count}` : count} products
          </span>
        </div>

        <div className={styles.content}>
          <ProductFilterMenu
            appliquedQueryParams={appliquedQueryParams}
            setPage={setPage}
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
    </>
  )
}

Products.isPublic = true
export default Products
