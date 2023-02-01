import Link from "next/link";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import styles from "@/styles/Navbar.module.css";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  const handleCart = () => {
    router.push("/cart");
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/home"> Airneis </Link>

      <ul className={styles.navbarList}>
        <li>
          {" "}
          <Link href="/home" className={styles.navbarLink}>
            {" "}
            Home{" "}
          </Link>{" "}
        </li>
        <li>
          {" "}
          <Link href="/products" className={styles.navbarLink}>
            {" "}
            Products{" "}
          </Link>{" "}
        </li>
        <li>
          {" "}
          <Link href="/category" className={styles.navbarLink}>
            {" "}
            Categories{" "}
          </Link>{" "}
        </li>
        <li>
          {" "}
          <Link href="/about" className={styles.navbarLink}>
            {" "}
            About{" "}
          </Link>{" "}
        </li>
        <li>
          {" "}
          <Link href="/contact" className={styles.navbarLink}>
            {" "}
            Contact us{" "}
          </Link>{" "}
        </li>
      </ul>

      <ul className={styles.navbarList}>
        <button className={styles.navbarButton}>
          {" "}
          <MagnifyingGlassIcon className={styles.navbarButtonIcon} />{" "}
        </button>
        <button className={styles.navbarButton} onClick={handleCart}>
          {" "}
          <ShoppingCartIcon className={styles.navbarButtonIcon} />{" "}
        </button>
        <button className={styles.navbarButton}>
          {" "}
          <UserIcon className={styles.navbarButtonIcon} />{" "}
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
