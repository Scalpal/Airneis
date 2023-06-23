import Banner from "@/web/components/Banner";
import DetailedProductCard from "@/web/components/DetailedProductCard";
import { useRouter } from "next/router";
import styles from "@/styles/categoryPage.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Category = () => {
  const { t: translate } = useTranslation("category");
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const { categoryName = "test" } = router.query;
  const categoryProducts = [
    {
      id: 1,
      name: "Modern beechwood chair",
      type: "Wood",
      description: "Black chairs made of 100 year old Himalayan beech wood",
      price: "$145",
      stock: 25,
      imageSrc: "/meuble-2.jpeg",
      materials: ["metal", "steel", "iron"],
    },
    {
      id: 2,
      name: "Chair",
      type: "Wood",
      price: "$145",
      stock: 25,
      imageSrc: "/meuble-2.jpeg",
      materials: ["metal", "steel", "iron"],
    },
    {
      id: 3,
      name: "Chair",
      type: "Wood",
      description: "Black chairs made of 100 year old Himalayan beech wood",
      price: "$145",
      stock: 25,
      imageSrc: "/meuble-2.jpeg",
      materials: ["metal", "steel", "iron"],
    },
    {
      id: 4,
      name: "Chair",
      type: "Wood",
      price: "$145",
      stock: 25,
      imageSrc: "/meuble-2.jpeg",
      materials: ["metal", "steel", "iron"],
    },
    {
      id: 5,
      name: "Chair",
      type: "Wood",
      description: "Black chairs made of 100 year old Himalayan beech wood",
      price: "$145",
      stock: 25,
      imageSrc: "/meuble-2.jpeg",
      materials: ["metal", "steel", "iron"],
    },
    {
      id: 6,
      name: "Chair",
      type: "Wood",
      price: "$145",
      stock: 25,
      imageSrc: "/meuble-2.jpeg",
      materials: ["metal", "steel", "iron"],
    },
  ];

  return (
    <>
      <Banner title={categoryName} />

      <main>
        <p className={styles.descriptionText}>{translate("categoryText")}</p>

        <div className={styles.productsList}>
          {categoryProducts.map((product, index) => {
            return <DetailedProductCard key={index} product={product} />;
          })}
        </div>
      </main>
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["category"])),
    },
  };
};
Category.isPublic = true;
export default Category;
