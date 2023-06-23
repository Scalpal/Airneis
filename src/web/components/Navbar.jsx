import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/24/solid";
import styles from "@/styles/components/Navbar.module.css";
import { useEffect } from "react";
import { classnames } from "@/pages/_app";
import CartButton from "./CartButton";
import SearchProductOverlay from "./SearchProductOverlay";

const Navbar = (props) => {
  const { fixed, isDrawerToggledState } = props;

  const [isDrawerToggled, setIsDrawerToggled] = isDrawerToggledState;

  useEffect(() => {
    const navbar = document.querySelector("#navbar");

    if (fixed) {
      const carouselObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting === true || isDrawerToggled === true) {
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

  return (
    <nav
      className={classnames(fixed ? styles.navbar : styles.navbarNotFixed)}
      id="navbar"
    >
      <Link
        href="/home"
        className={classnames("navbarLogo", styles.navbarLogo)}
      >
        Airneis
      </Link>

      <ul className={classnames(styles.navbarList, styles.midLinks)}>
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
      </ul>

      <ul className={styles.navbarList}>
        <SearchProductOverlay />

        <CartButton />

        <button className={styles.navbarButton}>
          <Bars3Icon
            className={styles.navbarButtonIcon}
            onClick={() => setIsDrawerToggled(!isDrawerToggled)}
          />
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
