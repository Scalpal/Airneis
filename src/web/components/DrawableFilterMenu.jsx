import ProductFilterMenu from "./ProductFilterMenu";
import styles from "@/styles/components/DrawableFilterMenu.module.css";
import { useEffect, useState } from "react";
import { classnames } from "@/pages/_app";
import { nunito } from "@/pages/_app";

const DrawableFilterMenu = (props) => {

  const { handleQueryParamsFilters } = props; 

  const [isOpen, setIsOpen] = useState(false); 

  // Avoid body scroll when filter menu is opened
  useEffect(() => {
    const body = document.querySelector("body");
    isOpen ? body.style.position = "fixed" : body.style.position = "";
  }, [isOpen]);



  return (
    <>
      <button
        className={styles.filterButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        F<br />
        I<br/>
        L<br/>
        T<br/>
        E<br/>
        R<br/>
        S<br/>
      </button>

      <div
        className={classnames(
          nunito.className,
          styles.drawable,
          isOpen ? styles.open : styles.closed
        )}
      >
        <ProductFilterMenu
          handleQueryParamsFilters={handleQueryParamsFilters}
          setIsOpen={setIsOpen}
          key={"filter"}
        />
      </div>
    </>

  );
};

export default DrawableFilterMenu;