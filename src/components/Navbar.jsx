import Link from "next/link";
import { MagnifyingGlassIcon,ShoppingCartIcon, UserIcon,} from "@heroicons/react/24/solid";
import styles from "@/styles/Navbar.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { classnames } from "@/pages/_app";

const Navbar = (props) => {

  const router = useRouter();
  const { fixed } = props; 

  useEffect(() => {
    const navbar = document.querySelector("#navbar");

    if (fixed) {
      const carouselObserver = new IntersectionObserver(
        (entries) => {

          if (entries[0].isIntersecting === true) {
            navbar.classList.remove("navbarBackground");
          } else {
            navbar.classList.add("navbarBackground");
          }
        },
        { threshold: [0.1] }
      );

      carouselObserver.observe(document.querySelector("#carousel"));
    } else {
      navbar.classList.remove("navbarBackground");
    }
  });

  const handleCart = () => {
    router.push("/cart");
  };

  return (
    <nav
      className={
        classnames(fixed ? styles.navbar : styles.navbarNotFixed)
      }
      id="navbar">
      <Link href="/home" className="navbarLogo">
        Airneis
      </Link>

      <ul className={styles.navbarList}>
        <li>
          <Link href="/home" className={styles.navbarLink}>
            Home
          </Link>
        </li>

        <li>
          <Link href="/products" className={styles.navbarLink}>
            Products
          </Link>
        </li>

        <li>
          <Link href="/category" className={styles.navbarLink}>
            Categories
          </Link>
        </li>

        <li>
          <Link href="/about" className={styles.navbarLink}>
            About
          </Link>
        </li>

        <li>
          <Link href="/contact" className={styles.navbarLink}>
            Contact us
          </Link>
        </li>
      </ul>

      <ul className={styles.navbarList}>
        <button className={styles.navbarButton}>
          <MagnifyingGlassIcon className={styles.navbarButtonIcon} />
        </button>
        <button className={styles.navbarButton} onClick={handleCart}>
          <ShoppingCartIcon className={styles.navbarButtonIcon} />
          {/* <span className={styles.navbarButtonCartCount}>2</span> */}
        </button>

        <button className={styles.navbarButton}>
          <UserIcon className={styles.navbarButtonIcon} />
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
