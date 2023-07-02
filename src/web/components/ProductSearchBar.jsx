import { classnames } from "@/pages/_app";
import styles from "@/styles/components/ProductSearchBar.module.css"; 
import { useCallback, useState } from "react";
import useSearchProducts from "../hooks/useSearchProducts";
import Highlighter from "./Highlighter";
import routes from "../routes";
import Link from "next/link";
import Loader from "./Loader";
import CustomSearchBar from "./CustomSearchBar";

const ProductSearchBar = (props) => {
  const {
    id,
    placeholder,
    showSuggestions,
    closeOverlay
  } = props;

  const [inputFocused, setInputFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { searchData, searchLoading } = useSearchProducts(searchValue);
  const products = (!searchLoading && searchData) ? searchData.products : [];

  const clearSearch = useCallback(() => {
    setInputFocused(true);
    setSearchValue("");
  }, []);
    
  return (
    <div className={styles.container}>
      
      <CustomSearchBar
        id={id}
        placeholder={placeholder}
        size={"fit-to-parent"}
        additionnalClasses={[
          inputFocused ? styles.inputFocused : ""
        ]}
        clearSearch={() => clearSearch()}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <div
        className={classnames(
          styles.suggestionsContainer,
          (inputFocused && showSuggestions === true) ? styles.visible : styles.hidden,
          searchLoading ? styles.loading : ""
        )}
      >
        <p className={styles.suggestionsTitle}>
          {searchValue.length === 0 ?
            "Suggested searches" : "Matching results"}
        </p>

        {!searchLoading ? (products
          .map((product, index) => (
            <Link
              key={index}
              href={routes.products.single(product.id)}
              onClick={() => closeOverlay()}
              className={styles.productLink}
            >
              <Highlighter
                key={index}
                text={product.name}
                highlight={searchValue.toLowerCase()}
              />
            </Link>
          )
        )) : (
          <Loader />
        )}
      </div>
    </div>

  );
};

export default ProductSearchBar;