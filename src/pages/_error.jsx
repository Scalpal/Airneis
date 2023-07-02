import styles from "@/styles/ErrorPage.module.css";
import LayoutError from "@/web/components/LayoutError";
import { useRouter } from "next/router";
import { classnames, nunito } from "./_app";
import { useEffect } from "react";
import routes from "@/web/routes";

const ErrorPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(routes.home());
  }, [router]);

  return (
    <div
      className={classnames(
        styles.container,
        nunito.className
      )}
    >
      <p className={styles.mainTitle}>This page does not exist</p>
      
      <p className={styles.animatedText}>Redirecting </p>

      <div className={styles.loader}>
        <div></div><div></div><div></div><div></div>
      </div>
      
    </div>
  );
};

ErrorPage.getLayout = function (page) {
  return (
    <LayoutError>
      {page}
    </LayoutError>
  );
};


export default ErrorPage;