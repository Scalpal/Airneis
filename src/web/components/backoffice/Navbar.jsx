import styles from "@/styles/backoffice/Navbar.module.css";
import Link from "next/link";
import {
  HomeIcon,
  UserIcon,
  BuildingStorefrontIcon,
  TagIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
  ReceiptPercentIcon
} from "@heroicons/react/24/outline";
import { nunito } from "@/pages/_app";
import { classnames } from "@/pages/_app";
import { useUser } from "@/web/hooks/useUser";
import { useRouter } from "next/router";

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
    route: "/backoffice/orders",
    text: "Orders",
    icon: <ReceiptPercentIcon className={styles.linksIcon} />
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
  }
];

const Navbar = () => {
  const router = useRouter();

  const { userData, userError, userIsLoading } = useUser();
  const user = !userError && !userIsLoading ? userData : {};

  return (
    <nav className={classnames(styles.navbar, nunito.className)}>
      <div className={styles.adminInfosBlock}>
        <p>Hello administrator </p>
        <p>
          {user.lastName} {user.firstName}
        </p>
      </div>

      <div className={styles.midBlock}>
        {navLinks.map((link, index) => {
          return (
            <Link key={index} href={link.route} className={styles.links}>
              {link.icon}
              <p className={styles.linksText}>{link.text}</p>
            </Link>
          );
        })}
      </div>

      <div className={styles.bottomBlock}>
        <ArrowRightOnRectangleIcon
          className={classnames(styles.linksIcon, styles.logoutIcon)}
          onClick={() => router.push("/")}
        />
      </div>
    </nav>
  );
};

export default Navbar;