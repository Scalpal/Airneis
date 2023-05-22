import { nunito } from "@/pages/_app"
import Navbar from "./Navbar"
import Footer from "./Footer"
import DrawerMenu from "./DrawerMenu"
import { useState } from "react"

const LayoutStickyNavbar = ({ children }) => {
  const [isDrawerToggled, setIsDrawerToggled] = useState(false);

  return (
    <div className={nunito.className}>
      <Navbar
        fixed={false}
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
export default LayoutStickyNavbar;
