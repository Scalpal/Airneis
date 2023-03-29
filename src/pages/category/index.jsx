import Banner from "@/web/components/Banner";
// import { useRouter } from "next/router";
import CategoriesBlocks from "@/web/components/CategoriesBlocks";

const categories = [
  {
    name: "Moderne",
  },
  {
    name: "Vintage",
  },
  {
    name: "Chaises",
  },
  {
    name: "Contemporain",
  },
  {
    name: "Artisanal",
  },
  {
    name: "Bois",
  },
  {
    name: "Tables",
  },
  {
    name: "Literie",
  },
  {
    name: "Spécial suédois",
  },
  {
    name: "Marbre",
  },
  {
    name: "Salons",
  },
  {
    name: "Douche",
  },
];

const Categories = () => {
  // const router = useRouter();

  return (
    <>
      <Banner title={"Categories"} />

      <main>
        <CategoriesBlocks categories={categories} />
      </main>
    </>
  );
}
Categories.isPublic = true
export default Categories
