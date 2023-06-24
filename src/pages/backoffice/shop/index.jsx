import styles from "@/styles/backoffice/shopPage.module.css";
import Layout from "@/web/components/backoffice/Layout";
import { parseCookies } from "nookies";
import checkToken from "@/web/services/checkToken";
import checkIsAdmin from "@/web/services/checkIsAdmin";
import { classnames, nunito } from "@/pages/_app";
import { useCallback, useState } from "react";
import uploadHomeCarouselImage from "@/web/services/images/homeCarousel/uploadHomeCarouselImage";
import useGetHomeCarouselImage from "@/web/hooks/useGetHomeCarouselImage";
import ImageCard from "@/web/components/backoffice/ImageCard";
import ImageInput from "@/web/components/backoffice/ImageInput";
import deleteHomeCarouselImage from "@/web/services/images/homeCarousel/deleteHomeCarouselImage";
import CustomAlert from "@/web/components/CustomAlert";
import Loader from "@/web/components/Loader";
import CollapseMenu from "@/web/components/CollapseMenu";
import { ArrowsRightLeftIcon, EyeIcon, EyeSlashIcon, PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/solid";
import updateHomeCarouselImage from "@/web/services/images/homeCarousel/updateHomeCarouselImage";
import { useGetCategories } from "@/web/hooks/useGetCategories";
import uploadCategoryImage from "@/web/services/categories/uploadCategoryImage";
import Modal from "@/web/components/Modal";
import Button from "@/web/components/Button";
import editCategory from "@/web/services/categories/editCategory";


export const getServerSideProps = async (context) => {
  const { token } = parseCookies(context);
  const badTokenRedirect = await checkToken(token);
  const notAdminRedirect = await checkIsAdmin(context);


  if (badTokenRedirect || notAdminRedirect) {
    return badTokenRedirect || notAdminRedirect; 
  }

  return {
    props: {
    }
  };
};

const BackofficeShop = () => {
  const [alert, setAlert] = useState({ status: "", message: "" });
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(null); 
  const [newCategoryName, setNewCategoryName] = useState("");


  const { carouselImageData, carouselImageError ,carouselImageIsLoading, refreshCarouselImages } = useGetHomeCarouselImage();
  const carouselImages = (!carouselImageError && !carouselImageIsLoading) ? carouselImageData : [];

  const { categoriesData, categoriesError, categoriesIsLoading, refreshCategories } = useGetCategories();
  const categories = (!categoriesError && !categoriesIsLoading) ? categoriesData : [];

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

  // Categories
  const changeCategoryImage = useCallback(async (categoryId, file) => {
    const [error, response] = await uploadCategoryImage(categoryId, file); 

    if (error) {
      setAlert({ status: "error", message: error.message });
      setShowAlert(true);

      return;
    }

    setAlert({ status: "success", message: response.data.message });
    setShowAlert(true);
    refreshCategories();
  }, [refreshCategories]);

  const handleEditCategory = useCallback((categoryId) => {
    setShowModal(true);
    setActiveCategoryId(categoryId);
  }, []);

  const changeCategoryName = useCallback(async(categoryId) => {
    const [error, response] = await editCategory(categoryId, newCategoryName);

    if (error) {
      setAlert({ status: "error", message: error.message });
      setShowAlert(true);

      return;
    }

    setShowModal(false);
    setAlert({ status: "success", message: response.data.message });
    setShowAlert(true);
    refreshCategories();
  }, [refreshCategories, newCategoryName]);

  return (
    <div className={classnames(
      styles.container,
      nunito.className
    )}>
      <p className={styles.title}>Website content management</p>

      <div className={styles.block}>
        <CollapseMenu
          title={"Home carousel"}
          defaultCollapsed={false}
          size={"fit-to-parent"}
        >
          <div className={styles.homeCarouselImagesWrapper}>
            {!carouselImageIsLoading ? (
              carouselImages.length !== 0 ? (carouselImages.map((image, index) => (
                  <ImageCard
                    key={index}
                    image={image}
                    editButton={
                      !image.visible ?
                        <EyeIcon
                          className={styles.imageIcon}
                          onClick={() => handleImageVisibility(image.id, true)}
                        /> :
                        <EyeSlashIcon
                          className={styles.imageIcon}
                          onClick={() => handleImageVisibility(image.id, false)}
                        />
                    }
                    deleteButton={
                      <XMarkIcon
                        className={styles.imageIcon}
                        onClick={() => deleteCarouselImage(image.id, image.imageSrc)}
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
      </div>

      <div className={styles.block}>
        <CollapseMenu
          title={"Categories"}
          defaultCollapsed={false}
          size={"fit-to-parent"}
        >
          <div className={styles.categoriesContainer}>
            {!categoriesIsLoading ? (
              categoriesData.length > 0 ? (
                categories.map((category, index) => (
                  <ImageCard
                    key={index}
                    title={category.name}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    image={{ imageUrl: category.imageUrl }} // this should be category.imageUrl
                    addButton={
                      <>
                        <input
                          type="file"
                          name="file"
                          id={`categoryFileInput${index}`}
                          hidden
                          onChange={(e) => changeCategoryImage(category.id, e.target.files[0])}
                        />

                        <label htmlFor={`categoryFileInput${index}`}>
                          <ArrowsRightLeftIcon
                            className={styles.imageIcon}
                          />
                        </label>
                      </>
                    }
                    editButton={
                      <PencilSquareIcon
                        className={styles.imageIcon}
                        onClick={() => handleEditCategory(category.id)}
                      />
                    }
                  />
                ))
              ): (
                <p>You currently have no categories</p>
              )
            ): (
              <Loader />
            )}
          </div>
        </CollapseMenu>
      </div>

      <div className={styles.block}>
        <p className={styles.blockTitle}>Popular products</p>
      </div>

      <CustomAlert
        alert={alert}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />

      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          size={"fit-to-content"}
        >
          <div className={styles.categoryEditForm}>
            <p className={styles.categoryEditFormTitle}>Edit category name</p>

            <input
              type="text"
              className={styles.categoryInput}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />

            <Button
              onClick={() => changeCategoryName(activeCategoryId)}
            >
              Save
            </Button>

            <Button
              variant={"outlined"}
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

BackofficeShop.getLayout = function (page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default BackofficeShop; 