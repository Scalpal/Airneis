import Banner from "@/web/components/Banner"
// import { useRouter } from "next/router";
import CategoriesBlocks from "@/web/components/CategoriesBlocks"

const categories = [
  { name: "Modern" },
  { name: "Vintage" },
  { name: "Chair" },
  { name: "Contemporary" },
  { name: "Artisanal" },
  { name: "Wood" },
  { name: "Table" },
  { name: "Bedding" },
  { name: "Swedish special" },
  { name: "Marble" },
  { name: "Living room" },
  { name: "Shower" },
  { name: "Bed" },
]

const Categories = () => {
  // const router = useRouter();

  return (
    <>
      <Banner title={"Categories"} />

      <main>
        <CategoriesBlocks categories={categories} />
      </main>
    </>
  )
}
Categories.isPublic = true
export default Categories
