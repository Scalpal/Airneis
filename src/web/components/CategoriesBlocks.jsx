import { useRouter } from "next/router"
import styles from "@/styles/components/CategoriesBlocks.module.css"
import Image from "next/image"
import routes from "@/web/routes"

const CategoriesBlocks = (props) => {
  const { categories } = props
  const router = useRouter()

  return (
    <div className={styles.categoriesContainer}>
      {categories.map((category, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              router.push(routes.queryPage.category(category.name))
            }}
          >
            <p>{category.name}</p>

            <Image
              src={"/meuble-2.jpeg"}
              alt="Image de la catégorie"
              fill
              className={styles.categoriesContainerImage}
            />
          </div>
        )
      })}
    </div>
  )
}

export default CategoriesBlocks
