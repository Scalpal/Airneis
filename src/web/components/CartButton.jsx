import styles from "@/styles/components/CartButton.module.css"; 
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import routes from "@/web/routes";
import useAppContext from "../hooks/useAppContext";
import { useEffect,useState } from "react";
import { classnames } from "@/pages/_app";

const CartButton = (props) => {
  const { fixed } = props;
  const router = useRouter(); 
  const { state: { cart }, actions: { setCart } } = useAppContext(); 
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    if (cart) {
      const totalQuantity = cart.reduce((acc,obj) => acc + obj.quantity,0);
      setProductsCount(totalQuantity);
    }
  }, [cart, setCart]);

  const handleCart = () => {
    router.push(routes.cart());
  };

  return (
    <button className={styles.navbarButton} onClick={handleCart}>
      <ShoppingCartIcon className={classnames(styles.navbarButtonIcon, {
        [styles.black]: !fixed
      })} />
      {productsCount !== 0 && <span className={classnames({[styles.CartCountMax]: productsCount > 99},styles.navbarButtonCartCount)}>{productsCount > 99 ? "99+" : productsCount}</span>}
      
    </button>
  );
};

export default CartButton;

