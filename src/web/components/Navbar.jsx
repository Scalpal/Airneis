import Link from "next/link";
import { Bars3Icon} from "@heroicons/react/24/solid";
import styles from "@/styles/components/Navbar.module.css";
import { useEffect } from "react";
import { classnames } from "@/pages/_app";
import CartButton from "./CartButton";
import SearchProductOverlay from "./SearchProductOverlay";
import { useTranslation } from "next-i18next";
import routes from "../routes";

const Navbar = (props) => {
  const { t } = useTranslation(["navbar"]);
  const { fixed, isDrawerToggledState } = props;

  const [isDrawerToggled, setIsDrawerToggled] = isDrawerToggledState; 

  useEffect(() => {
    const navbar = document.querySelector("#navbar");

    if (fixed) {
      const carousel = document.querySelector("#carousel");

      if (carousel) {
        const carouselObserver = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting === true || isDrawerToggled === true) {
            navbar.classList.remove("navbarBackground");
          } else {
            navbar.classList.add("navbarBackground");
          }
        }, { threshold: [0.1] });

        carouselObserver.observe(carousel);
      }
    } else {
      navbar.classList.remove("navbarBackground");
    }
  });

  return (
    <nav
      className={classnames(fixed ? styles.navbar : styles.navbarNotFixed)}
      id="navbar"
    >
      <Link href="/" className={classnames("navbarLogo", styles.navbarLogo)}>
        {t("airneis")}
      </Link>

      <ul className={classnames(styles.navbarList, styles.midLinks)}>
        <li>
          <Link href={routes.home()} className={styles.navbarLink}>
            {t("home")}
          </Link>
        </li>

        <li>
          <Link href={routes.products.base()} className={styles.navbarLink}>
            {t("product")}
          </Link>
        </li>

        <li>
          <Link href={routes.categories.base()} className={styles.navbarLink}>
            {t("categories")}
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
