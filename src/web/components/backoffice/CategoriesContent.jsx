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
import editCategory from "@/web/services/categories/editCategory";
import Button from "../Button";
import Modal from "../Modal";

const CategoriesContent = () => {
  const [alert, setAlert] = useState({ status: "", message: "" });
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(null); 
  const [newCategoryName, setNewCategoryName] = useState("");

  const { categoriesData, categoriesError, categoriesIsLoading, refreshCategories } = useGetCategories();
  const categories = (!categoriesError && !categoriesIsLoading) ? categoriesData : [];

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

  const changeCategoryName = useCallback(async() => {
    const [error, response] = await editCategory(activeCategoryId, newCategoryName);

    if (error) {
      setAlert({ status: "error", message: error.message });
      setShowAlert(true);

      return;
    }

    setShowModal(false);
    setAlert({ status: "success", message: response.data.message });
    setShowAlert(true);
    refreshCategories();
  }, [refreshCategories, activeCategoryId, newCategoryName]);


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
                  key={index}
                  title={category.name}
                  image={{ imageUrl: category.imageUrl }}
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
          <div className={styles.editForm}>
            <p className={styles.editFormTitle}>Edit category name</p>

            <input
              type="text"
              className={styles.editFormInput}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />

            <Button
              onClick={() => changeCategoryName()}
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

      <CustomAlert
        alert={alert}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
    </>
  );
};

export default CategoriesContent;