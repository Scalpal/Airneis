import Banner from "@/web/components/Banner";
import CategoriesBlocks from "@/web/components/CategoriesBlocks";
import Axios from "axios";
import routes from "@/web/routes";

export const getServerSideProps = async () => {
  try {
    const {
      data: { categories },
    } = await Axios.get(`${process.env.API_URL}${routes.api.categories.base()}`);

    return {
      props: {
        categories: categories,
      },
    };
  } catch (error) {
    return {
      props: {
        categories: [],
      },
    };
  }
};

const Categories = (props) => {
  const { categories } = props;

  return (
    <>
      <Banner title={"Categories"} />

      <main>
        <CategoriesBlocks categories={categories} />
      </main>
    </>
  );
};

export default Categories;
