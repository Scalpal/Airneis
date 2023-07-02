import Banner from "@/web/components/Banner";
import CategoriesBlocks from "@/web/components/CategoriesBlocks";
import Axios from "axios";
import routes from "@/web/routes";
import Head from "next/head";

export const getServerSideProps = async () => {
  try {
    const { data: { categories } } = await Axios.get(`${process.env.API_URL}${routes.api.categories.base()}`);

    return {
      props: {
        categories: categories
      }
    };
  } catch (error) {
    return {
      props: {
        categories: []
      }
    };
  }
};

const Categories = (props) => {
  const { categories } = props;

  return (
    <>
      <Head>
        <title>Airneis - Categories</title>
        <meta key={"Categories head"} />
      </Head>        

      <Banner title={"Categories"} />

      <main>
        <CategoriesBlocks categories={categories} />
      </main>
    </>
  );
};

export default Categories;
