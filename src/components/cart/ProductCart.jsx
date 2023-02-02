import { TrashIcon } from "@heroicons/react/24/outline";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const ProductCart = (props) => {
  const { productsLists, handleDelete, handlePlus, handleMinus } = props;

  return (
    <>
      {productsLists.map((product) => (
        <div className="cartProductSummary" key={product.id}>
          <div className="cartProductFirstCol">
            <div className="cartProductPicture">
              {product.picture !== undefined && product.picture !== "" && (
                <Image
                  src={product.picture}
                  alt="Picture"
                  width="96"
                  height="96"
                />
              )}
            </div>
          </div>
          <div className="cartProductMidCol">
            <p className="cartProductName">{product.name}</p>
            <p className="cartProductDescription">{product.description}</p>
          </div>
          <div className="cartProductLastCol">
            <p className="cartProductPrice">
              {`${Number.parseFloat(product.price * product.quantity).toFixed(
                2
              )} €`}
            </p>
            <div className="cartProductQuantity">
              <button
                type="button"
                className="cartButtonAction"
                data-product-id={product.id}
                onClick={handleMinus}
              >
                <MinusIcon className="cartIcons" />
              </button>
              <p>{product.quantity}</p>
              <button
                type="button"
                className="cartButtonAction"
                data-product-id={product.id}
                onClick={handlePlus}
              >
                <PlusIcon className="cartIcons" />
              </button>
            </div>
            <button
              type="button"
              className="cartButtonAction"
              data-product-id={product.id}
              onClick={handleDelete}
            >
              <TrashIcon className="cartIcons" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCart;
