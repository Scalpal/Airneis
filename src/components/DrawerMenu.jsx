import styles from "@/styles/components/DrawerMenu.module.css"; 
import Link from "next/link";
import { classnames } from "@/pages/_app";
import { ArrowRightIcon } from "@heroicons/react/24/outline";


const DrawerMenu = (props) => {

  const { isDrawerToggledState } = props; 
  const [isDrawerToggled, setIsDrawerToggled] = isDrawerToggledState; 

  return (
    <>

      <div
        className={classnames(
          styles.overlay,
          isDrawerToggled ? styles.overlayActive : styles.overlayInactive
        )}
      >
      </div>

      <div
        className={classnames(
          styles.drawerMenu,
          isDrawerToggled ? styles.drawerMenuActive : styles.drawerMenuInactive
        )}
      >
        <ArrowRightIcon
          className={styles.drawerMenuIcon}
          onClick={() => setIsDrawerToggled(!isDrawerToggled)}
        />
        <Link href="">Login</Link>
        <Link href="">Register</Link>
        <Link href="">CGU</Link>
        <Link href="">Legal mentions</Link>
        <Link href="">Contact</Link>
        <Link href="">About us</Link>
      </div>
    </>
  );
};

export default DrawerMenu; 