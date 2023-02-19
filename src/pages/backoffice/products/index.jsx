import Layout from "@/components/backoffice/Layout";

const BackofficeProducts = () => {


  return (
    <main>
      <h2>Page index products</h2>
    </main>
  );
};

BackofficeProducts.getLayout = function(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default BackofficeProducts; 