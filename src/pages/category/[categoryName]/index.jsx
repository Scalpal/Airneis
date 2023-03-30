import Banner from "@/web/components/Banner";
import DetailedProductCard from "@/web/components/DetailedProductCard";
import { useRouter } from "next/router";
import styles from "@/styles/categoryPage.module.css";

const Category = () => {

  const router = useRouter();
  const categoryProducts = [
    {
      id: 1,
      name: "Chaise moderne en bois de hêtre",
      type: "bois",
      price: "145$",
      stock: 25,
      imageSrc: "/meuble-2.jpeg"
    },
    {
      id: 2,
      name: "chaise",
      type: "bois",
      price: "145$",
      stock: 25,
      imageSrc: "/meuble-2.jpeg"
    },
    {
      id: 3,
      name: "chaise",
      type: "bois",
      price: "145$",
      stock: 25,
      imageSrc: "/meuble-2.jpeg"
    },
    {
      id: 4,
      name: "chaise",
      type: "bois",
      price: "145$",
      stock: 25,
      imageSrc: "/meuble-2.jpeg"
    },
    {
      id: 5,
      name: "chaise",
      type: "bois",
      price: "145$",
      stock: 25,
      imageSrc: "/meuble-2.jpeg"
    },
    {
      id: 6,
      name: "chaise",
      type: "bois",
      price: "145$",
      stock: 25,
      imageSrc: "/meuble-2.jpeg"
    }
  ];


  return (
    <>
      <Banner title={router.query.categoryName} />

      <main>
        <p
          className={styles.descriptionText}
        >
          Nos chaises, fabriquée en bois de chêne sont d’une qualité premium, idéale pour une maison moderne.
        </p>

        <div className={styles.productsList}>
          {categoryProducts.map((product, index) => {
            return (
              <DetailedProductCard key={index} product={product} />
            );
          })}
        </div>
      </main>
    </>
  );
};
Category.isPublic = true;
export default Category;