import styles from "@/styles/backoffice/CategoriesContent.module.css";
import { ArrowsRightLeftIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import CustomAlert from "../CustomAlert";
import IconButton from "../IconButton";
import Loader from "../Loader";
import CollapseMenu from "../CollapseMenu";
import ImageCard from "./ImageCard";
import { useCallback, useState } from "react";
import { useGetCategories } from "@/web/hooks/useGetCategories";
import uploadCategoryImage from "@/web/services/categories/uploadCategoryImage";
import Modal from "../Modal";
import EditCategoryModalContent from "./EditCategoryModalContent";

const CategoriesContent = () => {
  const [alert, setAlert] = useState({ status: "", message: "" });
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null); 

  const { categoriesData, categoriesError, categoriesIsLoading, refreshCategories } = useGetCategories();
  const categories = (!categoriesError && !categoriesIsLoading) ? categoriesData : [];

  // Categories
  const changeCategoryImage = useCallback(async (categorySlug, file) => {
    if (!file) {
      return;
    }

    const [error, response] = await uploadCategoryImage(categorySlug, file); 

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
    const category = categoriesData.find(elt => elt.id === categoryId);

    setShowModal(true);
    setActiveCategory(category);
  }, [categoriesData]);

  return (
    <>
      <CollapseMenu
        title={"Categories"}
        defaultCollapsed={false}
        size={"fit-to-parent"}
      >
        <div className={styles.container}>
          {!categoriesIsLoading ? (
            categoriesData.length > 0 ? (
              categories.map((category, index) => (
                <ImageCard
                  key={category.id}
                  title={category.name}
                  image={{ imageUrl: category.imageUrl }}
                  additionnalClasses={[
                    !category.visible ? styles.notVisible : "", 
                    category.visibleInHome ? styles.visibleInHome : ""
                  ]}
                  addButton={
                    <>
                      <input
                        type="file"
                        name="file"
                        id={`categoryFileInput${index}`}
                        hidden
                        onChange={(e) => changeCategoryImage(category.slug, e.target.files[0])}
                      />

                      <label htmlFor={`categoryFileInput${index}`}>
                        <IconButton
                          Icon={ArrowsRightLeftIcon}
                          tooltip={"Change category image"}
                        />
                      </label>
                    </>
                  }
                  editButton={
                    <IconButton
                      Icon={PencilSquareIcon}
                      tooltip={"Edit category"}
                      onPress={() => handleEditCategory(category.id)}
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

      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          size={"fit-to-content"}
        >
          <EditCategoryModalContent
            activeCategory={activeCategory}
            setShowModal={setShowModal}
            refreshCategories={refreshCategories}
          />
        </Modal>
      )}

      <CustomAlert
        alert={alert}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
    </>
  );
};

export default CategoriesContent;