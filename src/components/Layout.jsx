import Navbar from "@/components/Navbar";
import Footer from "./Footer";
import DrawerMenu from "./DrawerMenu";
import { useState } from "react";
import { nunito } from "@/pages/_app";

const Layout = ({ children }) => {

  const [isDrawerToggled, setIsDrawerToggled] = useState(false); 

  return (
    <div className={nunito.className}>
      <Navbar
        fixed={true}
        isDrawerToggledState={[isDrawerToggled, setIsDrawerToggled]}
      />

      {children}

      <DrawerMenu
        isDrawerToggledState={[isDrawerToggled, setIsDrawerToggled]}
      />

      <Footer />
    </div>
  ); 
};

export default Layout;
