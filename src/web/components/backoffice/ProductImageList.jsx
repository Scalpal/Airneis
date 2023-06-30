import styles from "@/styles/backoffice/ProductImageList.module.css";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useCallback } from "react";
import deleteProductImage from "@/web/services/products/deleteProductImage";
import ImageCard from "./ImageCard";
import ImageInput from "./ImageInput";
import IconButton from "../IconButton";


const ProductImageList = (props) => {
  const {
    productId,
    currentProductImages,
    setCurrentProductImages,
    setAlert,
    setShowAlert,
    setCurrentProduct,
    editMode
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
              <ImageCard
                key={index}
                image={image}
                deleteButton={
                  <IconButton 
                    Icon={XMarkIcon}
                    tooltip={"Delete"}
                    onPress={() => deleteImage(image.imageSrc)}
                  />
                }
              />
            );
          }
        })}

        <ImageInput
          id={"productImageInput"}
          text={"Add a product image"}
          disabled={!editMode}
          onChangeEvent={(e) => setCurrentProductImages([...currentProductImages, e.target.files[0]])}
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
