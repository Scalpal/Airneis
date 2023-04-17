import Banner from "@/web/components/Banner";
import styles from "@/styles/products.module.css";
import DetailedProductCard from "@/web/components/DetailedProductCard";
import { useCallback, useState } from "react";
import ProductFilterMenu from "@/web/components/ProductFilterMenu";
import { XMarkIcon } from "@heroicons/react/24/solid";

const categoryProducts = [
  {
    id: 1,
    name: "Chaise moderne en bois de hêtre",
    type: "bois",
    description:
      "Chaises noir en bois de hêtre centenaire d'Himalayad,zkdanaldza nzdn lkdn jlkdznland kzalzdnalkd nkldzndzlaknalkn",
    price: "145$",
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
    materials: ["métal","acier","fer"],
  },
  {
    id: 2,
    name: "chaise",
    type: "bois",
    price: "145$",
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
    materials: ["métal","acier","fer"],
  },
  {
    id: 3,
    name: "chaise",
    type: "bois",
    description: "Chaises noir en bois de hêtre centenaire d'Himalaya",
    price: "145$",
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
    materials: ["métal","acier","fer"],
  },
  {
    id: 4,
    name: "chaise",
    type: "bois",
    price: "145$",
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
    materials: ["métal","acier","fer"],
  },
  {
    id: 5,
    name: "chaise",
    type: "bois",
    description: "Chaises noir en bois de hêtre centenaire d'Himalaya",
    price: "145$",
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
    materials: ["métal","acier","fer"],
  },
  {
    id: 6,
    name: "chaise",
    type: "bois",
    price: "145$",
    stock: 25,
    imageSrc: "/meuble-2.jpeg",
    materials: ["métal","acier","fer"],
  },
];

// const stockType = [
//   {
//     name: "In stock",
//     value: 1
//   },
//   {
//     name: "Out of stock",
//     value: 2
//   }
// ];


const Products = () => {

  const [queryParams, setQueryParams] = useState({
    materials: [],
    stock: "",
    categories: []
  });

  const handleQueryParamsFilters = useCallback((key, value) => {
    setQueryParams({
      ...queryParams,
      [key]: !queryParams[key].includes(value) ? [...queryParams[key], value] : [...queryParams[key].filter(elt => elt !== value)]
    });
  }, [queryParams, setQueryParams]);

  return (
    <>
      <Banner title={"Products"} />

      <main className={styles.main}>

        <input type="text" className={styles.input} />

        {/* It will show all the active filters with badges */}
        <div className={styles.filterBadgesContainer}>
          {queryParams.materials.length > 0 &&
            queryParams.materials.map((material, index) => (
              <p
                key={index}
                className={styles.filterBadge}
              >
                Material : {material}
                <XMarkIcon className={styles.filterBadgeIcon} />
              </p>
            ))
          }

          {/* {queryParams.categories.length > 0 && (
            
          )} */}
        </div>

        <div className={styles.content}>

          <ProductFilterMenu
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
