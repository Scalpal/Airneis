import Navbar from "@/components/Navbar";
import Footer from "./Footer";
import { montserrat } from "@/pages/_app";

const Layout = ({ children }) => {
  return (
    <div className={montserrat.className}>
      <Navbar fixed={true} />

      {children}

      <Footer />
    </div>
  );
};

export default Layout;
