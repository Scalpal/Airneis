import styles from "@/styles/backoffice/ProductImageList.module.css";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useCallback, useState } from "react";
import deleteProductImage from "@/web/services/products/deleteProductImage";
import ImageCard from "./ImageCard";
import ImageInput from "./ImageInput";
import IconButton from "../IconButton";
import CustomAlert from "../CustomAlert";


const ProductImageList = (props) => {
  const {
    productSlug,
    currentProductImages,
    setCurrentProductImages,
    setCurrentProduct,
    editMode
  } = props; 

  const [alert, setAlert] = useState({ status: "", message: "" });
  const [showAlert, setShowAlert] = useState(false);

  const removeImage = useCallback((index) => {
    const updatedImagesToUpload = currentProductImages.filter((_, i) => i !== index); 

    setCurrentProductImages(updatedImagesToUpload);
  }, [currentProductImages, setCurrentProductImages]);

  const deleteImage = useCallback(async (imageName) => {
    if (currentProductImages.length === 1) {
      setAlert({ status: "error", message: "A product must have at least 1 image." });
      setShowAlert(true);
      
      return;
    }

    const [error, { data }] = await deleteProductImage(imageName, productSlug);

    if (error) {
      setAlert({ status: "error", message: "Error on image deletion." });
      setShowAlert(true);

      return;
    }

    setAlert({ status: data.status, message: data.message });
    setShowAlert(true);
    setCurrentProduct(data.product); 
  }, [productSlug, setAlert, setShowAlert, setCurrentProduct, currentProductImages]);

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
          onChangeEvent={(e) => setCurrentProductImages([...currentProductImages, ...e.target.files])}
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
                onClick={() => removeImage(index)}
              >
                {image.name}
                <XMarkIcon className={styles.newProductImageRowIcon} />
              </p>
            );
          }
        })}
      </div>

      <CustomAlert
        alert={alert}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />

    </div>
  );
};

export default ProductImageList;
