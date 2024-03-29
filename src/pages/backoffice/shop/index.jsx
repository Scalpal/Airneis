import styles from "@/styles/backoffice/shopPage.module.css";
import Layout from "@/web/components/backoffice/Layout";
import { parseCookies } from "nookies";
import checkToken from "@/web/services/checkToken";
import checkIsAdmin from "@/web/services/checkIsAdmin";
import { classnames, nunito } from "@/pages/_app";
import HomeCarouselContent from "@/web/components/backoffice/HomeCarouselContent";
import CategoriesContent from "@/web/components/backoffice/CategoriesContent";
import PopularProductsContent from "@/web/components/backoffice/PopularProductsContent";
import Head from "next/head";


export const getServerSideProps = async (context) => {
  const { token } = parseCookies(context);
  const badTokenRedirect = await checkToken(token);
  const notAdminRedirect = await checkIsAdmin(context);


  if (badTokenRedirect || notAdminRedirect) {
    return badTokenRedirect || notAdminRedirect; 
  }

  return {
    props: {
    }
  };
};

const BackofficeShop = () => {
  return (
    <div className={classnames(
      styles.container,
      nunito.className
    )}>
      <Head>
        <title>Airneis - Backoffice : Content management</title>
      </Head>  

      <p className={styles.title}>Website content management</p>

      <HomeCarouselContent />

      <CategoriesContent />

      <PopularProductsContent />
    </div>
  );
};

BackofficeShop.getLayout = function (page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default BackofficeShop; 