import { classnames } from "@/pages/_app";
import styles from "@/styles/components/ProductSearchBar.module.css"; 
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import useSearchProducts from "../hooks/useSearchProducts";
import Highlighter from "./Highlighter";
import routes from "../routes";
import Link from "next/link";
import Loader from "./Loader";

const ProductSearchBar = (props) => {
  const { id, placeholder, showSuggestions, closeOverlay, ...otherProps } = props;

  const [inputFocused, setInputFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { searchData, searchLoading } = useSearchProducts(searchValue);
  const products = (!searchLoading && searchData) ? searchData.products : [];
  
  return (
    <div className={styles.container}>
      <div className={classnames(
        styles.wrapper,
        inputFocused ? styles.inputFocused : ""
      )}>
        <button className={styles.button}>
          <MagnifyingGlassIcon className={styles.icons} />
        </button>
        
        <input
          id={id}
          type="text"
          value={searchValue}
          className={classnames(
            styles.input,
            (inputFocused && showSuggestions === true) ? styles.inputFocused : ""
          )}
          placeholder={placeholder}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          onChange={(e) => setSearchValue(e.target.value)}
          {...otherProps}
        />

        <button
          className={styles.button}
          onClick={() => {
            setInputFocused(true);
            setSearchValue("");
          }}
        >
          <XMarkIcon className={styles.icons} />
        </button>
      </div>

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