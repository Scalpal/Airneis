import { CubeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer__body">
          <div className="footer__content">
            <ul className="footer__column">
              <li className="footer__logo">Àirneis</li>
              <li style={{ padding: "1rem 0" }}>
                <CubeIcon className="footer__icons" />
                <CubeIcon className="footer__icons" />
                <CubeIcon className="footer__icons" />
                <CubeIcon className="footer__icons" />
                <CubeIcon className="footer__icons" />
              </li>
              <li className="footer__child__column">Address</li>
              <li>+33 01 02 03 04 05</li>
              <li>23 Rue de la Tour, 75008 Paris</li>
            </ul>
            <ul className="footer__column">
              <li className="footer__child__column">My account</li>
              <li>
                <Link href="/sign-in">Sign in</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
              <li>
                <Link href="/order-status">Order status</Link>
              </li>
            </ul>
            <ul className="footer__column">
              <li className="footer__child__column">Help</li>
              <li>
                <Link href="/shipping">Shipping</Link>
              </li>
              <li>
                <Link href="/returns">Returns</Link>
              </li>
              <li>
                <Link href="/sizing">Sizing</Link>
              </li>
            </ul>
            <ul className="footer__column">
              <li className="footer__child__column">Shop</li>
              <li>
                <Link href="/products/all">All products</Link>
              </li>
              <li>
                <Link href="/products/bedroom">Bedroom</Link>
              </li>
              <li>
                <Link href="/products/dining-room">Dining Room</Link>
              </li>
            </ul>
            <ul className="footer__column">
              <li className="footer__child__column">Legal Stuff</li>
              <li>
                <Link href="/shipping-delivery">Shipping & Delivery</Link>
              </li>
              <li>
                <Link href="/terms-conditions">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy & Policy</Link>
              </li>
            </ul>
          </div>
          <div style={{ padding: "2vh 6vw" }}>
            Copyright ©2023 Airneis. All Rights Reserved
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
