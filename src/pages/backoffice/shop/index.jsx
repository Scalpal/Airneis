import Layout from "@/components/backoffice/Layout";

const BackofficeShop = () => {


  return (
    <>
      <h2>Gestion du carousel page daccueil </h2>
      <h2>Gestion des produits populaires</h2>
      <h2>Gestion des catégories </h2>
    </>

  );
};

BackofficeShop.getLayout = function(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default BackofficeShop; 