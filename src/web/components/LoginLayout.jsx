import styles from "@/styles/components/LoginLayout.module.css"; 
import { nunito } from "@/pages/_app";
import { classnames } from "@/pages/_app";
import Link from "next/link";

const LoginLayout = ({children}) => {

  return (
    <div
      className={classnames(
        styles.container,
        nunito.className
      )}
    >
      <div className={styles.left}>
        <div className={styles.leftBackground}></div>
        <Link href="/home">Airneis </Link>
        <p>A reference in the world of furniture.</p>
      </div>

      <div className={styles.right}>
        {children}
      </div>

    </div>
  );
};

export default LoginLayout;