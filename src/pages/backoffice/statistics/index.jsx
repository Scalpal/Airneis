import Layout from "@/web/components/backoffice/Layout";

const BackofficeStats = () => {


  return (
    <h2>Page index statistiques</h2>
  );
};
BackofficeStats.isPublic = true;
BackofficeStats.getLayout = function (page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default BackofficeStats; 