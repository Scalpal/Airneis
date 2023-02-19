import Layout from "@/components/backoffice/Layout";

const Backoffice = () => {


  return (
    <h2>Page index backoffice</h2>
  );
};

Backoffice.getLayout = function(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Backoffice; 