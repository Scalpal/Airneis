import Layout from "@/web/components/backoffice/Layout"
import { parseCookies } from "nookies"
import checkToken from "@/web/services/checkToken"
import checkIsAdmin from "@/web/services/checkIsAdmin"

const BackofficeDashboard = () => {
  return (
    <h2>Dashboard</h2>
  );
};

BackofficeDashboard.getLayout = (page) => {
  return <Layout>{page}</Layout>
}
export default BackofficeDashboard

export const getServerSideProps = async (context) => {
  const { token } = parseCookies(context)
  const badTokenRedirect = await checkToken(token)

  if (badTokenRedirect) {
    return badTokenRedirect
  }

  const notAdminRedirect = await checkIsAdmin(context)

  if (notAdminRedirect) {
    return notAdminRedirect
  }

  return {
    props: {
      prototype: "nothing",
    },
  }
}


export default BackofficeDashboard; 