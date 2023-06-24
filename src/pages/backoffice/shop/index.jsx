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


  const { carouselImageData, carouselImageError ,carouselImageIsLoading, refreshCarouselImages } = useGetHomeCarouselImage();
  const carouselImages = (!carouselImageError && !carouselImageIsLoading) ? carouselImageData : [];

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
        >
          <div className={styles.homeCarouselImagesWrapper}>
            {!carouselImageIsLoading ? (
              carouselImages.length !== 0 ? (carouselImages.map((image, index) => (
                  <ImageCard
                    key={index}
                    image={image}
                    onPress={() => deleteCarouselImage(image.id, image.imageSrc)}
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
        <p className={styles.blockTitle}>Categories images</p>
      </div>

      <div className={styles.block}>
        <p className={styles.blockTitle}>Popular products</p>
      </div>

      <CustomAlert
        alert={alert}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />

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