import Banner from "@/web/components/Banner";
import CategoriesBlocks from "@/web/components/CategoriesBlocks";
import Axios from "axios";
import routes from "@/web/routes";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps = async (context) => {
  const locale = context.locale;

  try {
    const {
      data: { categories }
    } = await Axios.get(
      `${process.env.API_URL}${routes.api.categories.base()}`
    );

    return {
      props: {
        categories: categories,
        ...(await serverSideTranslations(locale, [
          "categoriesPage",
          "footer",
          "drawerMenu",
          "productSearchBar",
          "searchProductOverlay",
          "navbar"
        ]))
      }
    };
  } catch (error) {
    return {
      props: {
        categories: [],
        ...(await serverSideTranslations(locale, [
          "categoriesPage",
          "footer",
          "drawerMenu",
          "productSearchBar",
          "searchProductOverlay",
          "navbar"
        ]))
      }
    };
  }
};

const Categories = (props) => {
  const { t } = useTranslation(["categoriesPage"]);
  const { categories } = props;

  return (
    <>
      <Head>
        <title>{t("categoriesPageHeadTitle")} </title>
        <meta key={"Categories head"} />
      </Head>

      <Banner title={t("categoriesPageTitle")} />

      <main>
        <CategoriesBlocks categories={categories} />
      </main>
    </>
  );
};

export default Categories;
