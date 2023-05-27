import styles from "@/styles/components/DrawerMenu.module.css";
import Link from "next/link";
import { classnames } from "@/pages/_app";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import routes from "../routes";

const DrawerMenu = (props) => {
  const { isDrawerToggledState, actions } = props;
  const [isDrawerToggled, setIsDrawerToggled] = isDrawerToggledState;

  const [signOut, session] = actions ? actions : [null, null];

  const router = useRouter();

  const logout = () => {
    signOut();
    router.push("/home");
  };

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
        {session ? <Link href="/profil">My profil</Link> : <Link href={routes.login()}>Login</Link>}
        {session ? <a onClick={logout}>Logout</a> : <Link href={routes.register()}>Register</Link>}
        {session && <Link href={routes.backoffice.base()}>Backoffice</Link>}
        <Link href="">CGU</Link>
        <Link href="">Legal mentions</Link>
        <Link href="">Contact</Link>
        <Link href="">About us</Link>
      </div>
    </>
  );
};

export default DrawerMenu; 