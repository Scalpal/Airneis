import { montserrat } from "@/pages/_app";
import Navbar from "./Navbar";
import Footer from "./Footer";

const LayoutStickyNavbar = ({children}) => {

  return ( 
    <div className={montserrat.className}>
      <Navbar fixed={false} />

      {children}

      <Footer />
    </div>
  );
};

export default LayoutStickyNavbar; 