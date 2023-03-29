import Layout from "@/web/components/backoffice/Layout";

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
BackofficeDashboard.isPublic = true
export default BackofficeDashboard; 