import Banner from "@/web/components/Banner";
import styles from "@/styles/products.module.css";
import DetailedProductCard from "@/web/components/DetailedProductCard";

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



const Products = () => {
  return (
    <>
      <Banner title={"Products"} />

      <main className={styles.main}>

        <input type="text" className={styles.input} />

        {/* It will show all the active filters with badges */}
        <div className={styles.filterBadgesContainer}>

        </div>

        <div className={styles.content}>
          <div className={styles.filterMenu}>
            <p>Filters</p>
          </div>

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
