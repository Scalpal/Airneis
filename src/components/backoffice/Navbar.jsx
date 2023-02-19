import styles from "@/styles/backoffice/Navbar.module.css";
import Link from "next/link";
import {
  HomeIcon,
  UserIcon,
  BuildingStorefrontIcon,
  TagIcon, 
  ChartBarIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";
import { montserrat } from "@/pages/_app";
import { classnames } from "@/pages/_app";

const navLinks = [
  {
    route: "/backoffice/dashboard",
    text: "Dashboard",
    icon: <HomeIcon className={styles.linksIcon} />
  },
  {
    route: "/backoffice/users",
    text: "Users",
    icon: <UserIcon className={styles.linksIcon} />
  },
  {
    route: "/backoffice/products",
    text: "Products",
    icon: <TagIcon className={styles.linksIcon} />
  },
  {
    route: "/backoffice/statistics",
    text: "Statistics",
    icon: <ChartBarIcon className={styles.linksIcon} />
  },
  {
    route: "/backoffice/shop",
    text: "Shop",
    icon: <BuildingStorefrontIcon className={styles.linksIcon} />
  },
];

const Navbar = () => {

  return (
    <nav
      className={classnames(
        styles.navbar,
        montserrat.className
      )}
    > 
      <div className={styles.adminInfosBlock}>

      </div>


      <div className={styles.midBlock}>
        {navLinks.map((link,index) => {
          return (
            <Link
              key={index}
              href={link.route}
              className={styles.links}
            >
              {link.icon}
              <p className={styles.linksText}>{link.text}</p>
            </Link>
          ); 
        })}
      </div>

      <div className={styles.bottomBlock}>
        <ArrowRightOnRectangleIcon
          className={classnames(
            styles.linksIcon,
            styles.logoutIcon
          )}
        />
      </div>
    </nav>
  );
};

export default Navbar;