import { useRouter } from "next/router";
import styles from "@/styles/components/CategoriesBlocks.module.css"; 
import routes from "../routes";
import ImageWithFallback from "./ImageWithFallback";

const CategoriesBlocks = (props) => {
  const { categories } = props; 
  const router = useRouter(); 

  return (
    <div className={styles.categoriesContainer}>
      {categories.map((category, index) => {
        return (
          <div
            key={index}
            onClick={() => router.push(routes.categories.single(category.slug)) }
          >
            <p>{category.name}</p>

            <ImageWithFallback
              className={styles.categoriesContainerImage}
              src={category.imageUrl ? category.imageUrl : `${process.env.AWS_BUCKET_URL}${category.imageSrc}`}
              alt={category.name}
              fallbackSrc={"/placeholder-image.png"}
              fill 
            />
          </div>
        );
      })}          
    </div>
  );
};

export default CategoriesBlocks; 