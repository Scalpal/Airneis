import Navbar from "@/web/components/Navbar";
import Footer from "./Footer";
import DrawerMenu from "./DrawerMenu";
import { useState } from "react";
import { nunito } from "@/pages/_app";
import useAppContext from "@/web/hooks/useAppContext";


const Layout = ({ children }) => {

  const {
    actions: { signOut },
    state: { session }
  } = useAppContext();


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
        actions={[signOut, session]}
      />

      <Footer actions={[signOut, session]}/>
    </div>
  );
};

export default Layout;
