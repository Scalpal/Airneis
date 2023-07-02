import styles from "@/styles/components/Footer.module.css";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import routes from "../routes";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInfos}>
        <div>
          <h2>Airneis</h2>

          <p> Adress </p>
          <p> 23 rue de la tour, 75008 Paris </p>
        </div>

        <div>
          <h2>My Account </h2>
          <Link href={routes.login()}>Login</Link>
          <Link href={routes.register()}>Register</Link>
          <p>Order status</p>
        </div>

        <div>
          <h2>Shop</h2>
          <Link href={routes.products.base()}>All products</Link>
          <Link href={routes.categories.base()}>All categories</Link>
        </div>

        <div>
          <h2>Legal</h2>
          <p>Privacy & policy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
