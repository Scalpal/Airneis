import styles from "@/styles/backoffice/ProductImageList.module.css";
import Image from "next/image";
import ProductImageInput from "../ProductImageInput";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useCallback } from "react";
import deleteProductImage from "@/web/services/products/deleteProductImage";


const ProductImageList = (props) => {
  const {
    productId,
    currentProductImages,
    setCurrentProductImages,
    setAlert,
    setShowAlert,
    setCurrentProduct
  } = props; 

  const deleteImage = useCallback(async(imageName) => {
    const [error, { data }] = await deleteProductImage(imageName, productId);

    if (error) {
      setAlert({ status: "error", message: "Error on image deletion." });
      setShowAlert(true);

      return;
    }

    setAlert({ status: data.status, message: data.message });
    setShowAlert(true);
    setCurrentProduct(data.product); 
  }, [productId, setAlert, setShowAlert, setCurrentProduct]);

  return (
    <div className={styles.container}>
      <div className={styles.currentProductImagesWrapper}>
        {currentProductImages.map((image, index) => {
          if (!(image instanceof File)) {
            return (
              <div
                key={index}
                className={styles.imageWrapper}
              > 
                <Image
                  className={styles.image}
                  alt={"Product image"}
                  src={image.imageUrl ? image.imageUrl : `${process.env.AWS_BUCKET_URL}${image.imageSrc}`}
                  fill
                />

                <div className={styles.imageOverlay}>
                  <XMarkIcon
                    onClick={() => deleteImage(image.imageSrc)}
                    className={styles.imageOverlayIcon}
                  />
                </div>
              </div>
            );
          }
        })}

        <ProductImageInput
          images={currentProductImages}
          onChangeEvent={setCurrentProductImages}
        />
      </div>

      
      <div className={styles.newProductImagesWrapper}> 
        {currentProductImages.filter(elt => elt instanceof File).length > 0 && (
          <p
            className={styles.newProductImagesTitle}
          >
            New images :
          </p>
        )}

        {currentProductImages.map((image, index) => {
          if ((image instanceof File)) {
            return (
              <p
                key={index}
                className={styles.newProductImageRow}
              >
                {image.name}
                <XMarkIcon className={styles.newProductImageRowIcon} />
              </p>
            );
          }
        })}
      </div>


    </div>
  );
};

export default ProductImageList;