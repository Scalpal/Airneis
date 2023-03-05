import Layout from "@/components/backoffice/Layout"; 

const BackofficeDashboard = () => {


  return (
    <h2>Dashboard</h2>
  );
};

BackofficeDashboard.getLayout = (page) => {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default BackofficeDashboard; 