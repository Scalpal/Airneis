import Layout from "@/components/backoffice/Layout";

const BackofficeUsers = () => {


  return (
    <h2>Page index users</h2>
  );
};

BackofficeUsers.getLayout = function(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default BackofficeUsers; 