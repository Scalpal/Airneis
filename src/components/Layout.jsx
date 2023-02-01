import { Montserrat } from "@next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "./Footer";


// const quicksand = Quicksand({
//   weight: ["300", "400", "500", "600", "700"],
//   style: ["normal"],
//   subsets: ["latin"]
// });

// const openSans = Open_Sans({
//   variable: ["100","200","300", "400", "500", "600", "700"],
//   style: ["italic", "normal"],
//   subsets: ["latin"]
// });

const montserrat = Montserrat({
  variable: ["100","200","300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"]
})

const Layout = ({ children }) => {

  return (
    <div className={montserrat.className}>
      <Navbar />

      {children}

      <Footer />

    </div>
  );
};

export default Layout;