import { TrashIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useCallback, useState } from "react";

const ProductCart = (props) => {
  const { products } = props;
  const [productList, setProductList] = useState(products);

  const handleDelete = useCallback(
    (e) => {
      const productListId = Number.parseInt(
        e.currentTarget.getAttribute("data-product-list-id")
      );

      setProductList(
        products.filter((product) => product.id !== productListId)
      );
    },
    [products]
  );

  return (
    <>
      {products.map((product) => (
        <div className="cart__productSummary" key={product.id}>
          <div className="cart__productPicture">
            {product.picture !== "" && (
              <Image src={`${product.picture}.png`} alt="Picture" />
            )}
          </div>
          <div className="cart__productCol">
            <p className="cart__productName">{product.name}</p>
            <p className="cart__productDescription">{product.description}</p>
          </div>
          <div>
            <p className="cart__productPrice">
              {`${Number.parseFloat(product.price).toFixed(2)} €`}
            </p>
            <div className="cart__productAmount">
              <XMarkIcon style={{ width: "1rem", height: "1rem" }}></XMarkIcon>
              <input
                name="productAmount"
                defaultValue={product.amount}
                maxLength="2"
                required
              />
            </div>
            <button
              type="button"
              className="cart__productRemove"
              data-product-list-id={product.id}
              onClick={handleDelete}
            >
              <TrashIcon
                style={{ width: "1.5rem", height: "1.5rem" }}
              ></TrashIcon>
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCart;
