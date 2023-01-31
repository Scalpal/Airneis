import { Quicksand } from "@next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "./Footer";


const quicksand = Quicksand({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"]
});

const Layout = ({ children }) => {

  return (
    <div className={quicksand.className}>
      <Navbar />

      {children}

      <Footer />

    </div>
  );
};

export default Layout;