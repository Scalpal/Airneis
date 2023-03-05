import Banner from "@/components/Banner";
// import { useRouter } from "next/router";
import CategoriesBlocks from "@/components/CategoriesBlocks";

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

export default function Categories() {
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
