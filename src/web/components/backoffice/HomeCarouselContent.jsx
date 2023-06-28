import styles from "@/styles/backoffice/HomeCarouselContent.module.css";
import CollapseMenu from "../CollapseMenu";
import useGetHomeCarouselImage from "@/web/hooks/useGetHomeCarouselImage";
import { useCallback, useState } from "react";
import uploadHomeCarouselImage from "@/web/services/images/homeCarousel/uploadHomeCarouselImage";
import deleteHomeCarouselImage from "@/web/services/images/homeCarousel/deleteHomeCarouselImage";
import updateHomeCarouselImage from "@/web/services/images/homeCarousel/updateHomeCarouselImage";
import ImageCard from "./ImageCard";
import IconButton from "../IconButton";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ImageInput from "./ImageInput";
import Loader from "../Loader";
import CustomAlert from "../CustomAlert";

const HomeCarouselContent = () => {
  const [alert, setAlert] = useState({ status: "", message: "" });
  const [showAlert, setShowAlert] = useState(false);

  const { carouselImageData, carouselImageError ,carouselImageIsLoading, refreshCarouselImages } = useGetHomeCarouselImage();
  const carouselImages = (!carouselImageError && !carouselImageIsLoading) ? carouselImageData : [];

  // Home carousel images 
  const uploadCarouselImage = useCallback(async(file) => {
    const [error, response] = await uploadHomeCarouselImage(file);
    
    if (error) {
      setAlert({ status: "error", message: error.message });
      setShowAlert(true);

      return;
    }

    setAlert({ status: "success", message: response.data.message });
    setShowAlert(true);
    refreshCarouselImages();
  }, [refreshCarouselImages]);

  const deleteCarouselImage = useCallback(async(id, imageName) => {
    const [error, response] = await deleteHomeCarouselImage(id, imageName); 

    if (error) {
      setAlert({ status: "error", message: error.message });
      setShowAlert(true);

      return;
    }
    
    setAlert({ status: "success", message: response.data.message });
    setShowAlert(true);
    refreshCarouselImages();
  }, [refreshCarouselImages]); 

  const handleImageVisibility = useCallback(async(imageId, visible) => {
    const [error, response] = await updateHomeCarouselImage(imageId, visible); 
    
    if (error) {
      setAlert({ status: "error", message: error.message });
      setShowAlert(true);

      return;
    }

    setAlert({ status: "success", message: response.data.message });
    setShowAlert(true);
    refreshCarouselImages();
  }, [refreshCarouselImages]);

  return (
    <>
      <CollapseMenu
        title={"Home carousel"}
        defaultCollapsed={false}
        size={"fit-to-parent"}
      >
        <div className={styles.container}>
          {!carouselImageIsLoading ? (
            carouselImages.length !== 0 ? (carouselImages.map((image, index) => (
              <ImageCard
                key={index}
                image={image} 
                additionnalClasses={[
                  !image.visible ? styles.notVisible : ""
                ]}
                editButton={
                  !image.visible ?
                    <IconButton 
                      Icon={EyeIcon}
                      tooltip={"Unhide image"}
                      onPress={() => handleImageVisibility(image.id, true)}
                    />
                    :
                    <IconButton 
                      Icon={EyeSlashIcon}
                      tooltip={"Hide image"}
                      onPress={() => handleImageVisibility(image.id, false)}
                    />
                }
                deleteButton={
                  <IconButton 
                    Icon={XMarkIcon}
                    tooltip={"Delete image"}
                    onPress={() => deleteCarouselImage(image.id, image.imageSrc)}
                  />
                }
              />
            ))) : (
              <p>There is currently no images on the home carousel.</p>
            )
          ) : (
            <div>
              <Loader />
            </div>
          )}

          <ImageInput
            id={"homeCarouselImageInput"}
            text={"Add an image"}
            onChangeEvent={(e) => uploadCarouselImage(e.target.files[0])}
          />
        </div>
      </CollapseMenu>
      <CustomAlert
        alert={alert}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
    </>

  );
};

export default HomeCarouselContent;