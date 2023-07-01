import styles from "@/styles/backoffice/EditCategoryModalContent.module.css"; 
import { useCallback, useState } from "react";
import Toggle from "../Toggle";
import Button from "../Button";
import CustomAlert from "../CustomAlert";
import editCategory from "@/web/services/categories/editCategory";

const EditCategoryModalContent = (props) => {
  const {
    activeCategory,
    setShowModal,
    refreshCategories
  } = props;

  const [alert, setAlert] = useState({ status: "", message: "" });
  const [showAlert, setShowAlert] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(activeCategory);
  const [newCategoryName, setNewCategoryName] = useState(activeCategory.name);

  const handleActiveCategoryVisibility = useCallback(() => {
    setCurrentCategory({
      ...currentCategory,
      visible: currentCategory.visible ? false : true
    });
  }, [currentCategory, setCurrentCategory]);

  const handleActiveCategoryVisibilityInHome = useCallback(() => {
    setCurrentCategory({
      ...currentCategory,
      visibleInHome: currentCategory.visibleInHome ? false : true
    });
  }, [currentCategory, setCurrentCategory]);

  const changeCategoryInformations = useCallback(async () => {
    const body = {
      name: newCategoryName,
      visible: currentCategory.visible,
      visibleInHome: currentCategory.visibleInHome
    };

    const [error, response] = await editCategory(currentCategory.slug, body);

    if (error) {
      setAlert({ status: "error", message: error.message });
      setShowAlert(true);

      return;
    }
    
    refreshCategories();
    setShowModal(false);
    setAlert({ status: "success", message: response.data.message });
    setShowAlert(true);
  }, [refreshCategories, newCategoryName, setShowModal, currentCategory]);

  return (
    <div className={styles.editForm}>
      <p className={styles.editFormTitle}>Edit category name</p>

      <input
        type="text"
        className={styles.editFormInput}
        defaultValue={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
      />

      <div className={styles.toggleWrapper}>
        <p>Visible</p>

        {(activeCategory) && (
          <Toggle
            toggled={activeCategory.visible}
            onPress={() => handleActiveCategoryVisibility()}
          />
        )}
      </div>

      <div className={styles.toggleWrapper}>
        <p>Visible in home page</p>

        {activeCategory && (
          <Toggle
            toggled={activeCategory.visibleInHome}
            onPress={() => handleActiveCategoryVisibilityInHome()}
          />
        )}

      </div>

      <Button
        onClick={() => changeCategoryInformations()}
      >
        Save
      </Button>

      <Button
        variant={"outlined"}
        onClick={() => setShowModal(false)}
      >
        Close
      </Button>

      <CustomAlert
        alert={alert}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
    </div>
  );
};

export default EditCategoryModalContent;