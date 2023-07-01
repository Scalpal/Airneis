import { classnames, nunito } from "@/pages/_app";
import styles from "@/styles/backoffice/SpecificProductPageContent.module.css";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Field, FieldArray, Form, Formik } from "formik";
import LoginField from "../LoginField";
import { useCallback, useEffect, useState } from "react";
import Button from "../Button";
import CustomAlert from "../CustomAlert";
import { createValidator, numberValidator, stringValidator } from "@/validator";
import { splitCamelCase } from "@/web/services/SplitCamelCase";
import routes from "@/web/routes";
import { AxiosError } from "axios";
import CollapseMenu from "../CollapseMenu";
import { useGetMaterials } from "@/web/hooks/useGetMaterials";
import CheckboxItem from "../CheckboxItem";
import BackButton from "./BackButton";
import { useGetCategories } from "@/web/hooks/useGetCategories";
import ProductImageList from "./ProductImageList";
import uploadProductImage from "@/web/services/products/uploadProductImage";
import getApiClient from "@/web/services/getApiClient";

const validationSchema = createValidator({
  name: stringValidator.required(),
  description: stringValidator.required(),
  price: numberValidator.required(),
  stock: numberValidator.required(),
  categoryId: numberValidator.required(),
});

const mappableKeys = ["name", "description", "price", "stock"];

const SpecificProductPageContent = (props) => {
  const { product, setActiveProduct, refreshProducts, showModal, setShowModal } = props;

  const [currentProduct, setCurrentProduct] = useState(product);
  const [currentProductImages, setCurrentProductImages] = useState(product.productImages);
  const [editMode, setEditMode] = useState(false);
  const [alert, setAlert] = useState({ status: "", message: "" });
  const [showAlert, setShowAlert] = useState(false);

  const { materialsData, materialsError, materialsIsLoading } = useGetMaterials(); 
  const materials = (!materialsIsLoading && !materialsError) ? materialsData : [];

  const { categoriesData, categoriesError, categoriesIsLoading } = useGetCategories();
  const categories = (!categoriesIsLoading && !categoriesError) ? categoriesData : [];

  const initialValues = {
    name: currentProduct.name,
    description: currentProduct.description,
    price: currentProduct.price,
    stock: currentProduct.stock,
    categoryId: currentProduct.category.id,
    materials: currentProduct.materials
  };

  const handleEditMode = useCallback((type, handleReset) => {
    if (editMode) {
      setEditMode(false); 
      handleReset(); 

      return;
    }

    setEditMode(true); 
  }, [editMode]);

  const getInputType = useCallback((value) => {
    if (typeof value === "string" || typeof value === "number") {
      return "text";
    }

    if (typeof value === "boolean") {
      return "checkbox";
    }
  }, []);

  const handleSubmit = useCallback(async (values) => {
    const reqInstance = getApiClient();
    values.price = Number.parseInt(values.price);
    values.stock = Number.parseInt(values.stock);
  
    const materials = values.materials.reduce((acc, { id }) => [...acc, id], []);
    values.materials = materials;

    const newImages = currentProductImages.filter(elt => elt instanceof File); //
    
    try {
      if (newImages.length > 0) {
        newImages.map(async (file) => {
          const [error, response] = await uploadProductImage(file, currentProduct.slug);

          if (error) {
            setShowAlert(true);
            setAlert({ status: "error", message: "Error on image upload. Retry." });

            return;
          }

          setCurrentProduct(response.data.product);
        });
      }

      const { data } = await reqInstance.patch(routes.api.products.single(currentProduct.slug), values);

      setEditMode(false);
      setCurrentProduct(data.product);
      setShowAlert(true);
      setAlert({ status: data.status, message: data.message });
      refreshProducts();
    } catch (error) {
      if (error instanceof AxiosError) {
        setShowAlert(true);
        setAlert({ status: error.response.status, message: error.response.message });
      }
    }
  }, [currentProduct.slug, refreshProducts, currentProductImages]); 

  const isMaterialChecked = (values, id) => {
    const productMaterialIds = values.reduce((acc, { id }) => [...acc, id], []); 
      
    return productMaterialIds.includes(id) ? true : false;
  };
  
  useEffect(() => {
    if (showModal === false) {
      setActiveProduct(null);
    }
  }, [showModal, setActiveProduct]);

  useEffect(() => {
    setCurrentProductImages(currentProduct.productImages);
  }, [currentProduct.productImages]); 

  return (
    <main
      className={classnames(
        styles.mainContainer,
        nunito.className
      )}
    >
      <BackButton setShowModal={setShowModal} />

      <p className={styles.title}>Product {currentProduct.id} : {currentProduct.name}</p>

      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        enableReinitialize={true}
        initialValues={initialValues}
      >
        {({ values, isSubmitting, handleReset }) => {          
          return (
            <Form className={styles.contentContainer}>
              <div className={styles.contentWrapper}> 
                <div className={styles.contentLeft}>
                  <div className={styles.contentTitleWrapper}>
                    <p>Informations</p>

                    <PencilSquareIcon
                      className={styles.titleIcon}
                      onClick={() => handleEditMode("informations", handleReset)}
                    />
                  </div>

                  {Object.entries(initialValues).map(([key, value], index) => (
                    mappableKeys.includes(key) && (
                      <LoginField
                        key={index}
                        name={key}
                        type={getInputType(value)}
                        label={splitCamelCase(key)}
                        showError={true}
                        disabled={!editMode}
                      /> 
                    )
                  ))}

                  <div className={styles.categorySelectWrapper}>
                    <p className={styles.contentTitle}> Category </p>

                    <Field name="categoryId" as="select" className={styles.select} disabled={!editMode}>
                      <option disabled>Category</option>
                        {categories.map(({ id, name }, index) => (
                          <option
                            key={index}
                            value={id}
                            defaultValue={id === currentProduct.category.id ? true : false}
                          >
                            {id} - {name}
                          </option>
                        ))}
                    </Field>
                  </div>
                </div>

                <div className={styles.contentRight}>
                  <div className={styles.categorySelectWrapper}>
                    <p className={styles.contentTitle}> Product images </p>
                    
                    <ProductImageList
                      productSlug={currentProduct.slug}
                      currentProductImages={currentProductImages}
                      setCurrentProductImages={setCurrentProductImages}
                      setCurrentProduct={setCurrentProduct}
                      editMode={editMode}
                    />
                  </div>
          
                  <FieldArray name="materials">
                    {({ push, remove }) => (
                      <CollapseMenu title="Materials" defaultCollapsed={true} size="small">
                        {materials.map(({ id, name }, index) => (
                          <CheckboxItem
                            key={index}
                            name={name}
                            value={id}
                            onChange={() => !isMaterialChecked(values.materials, id) ? push({ id: id, name: name }) : remove(values.materials.findIndex(elt => elt.id === id))}
                            checked={isMaterialChecked(values.materials, id)}
                            disabled={!editMode}
                          />
                        ))}
                      </CollapseMenu>
                    )}
                  </FieldArray>
                </div>
              </div>
              
              {editMode && (
                <Button
                  type={"submit"}
                  disabled={isSubmitting}
                >
                  Save
                </Button>
              )}
            </Form>
          );
        }}
      </Formik>

      <CustomAlert
        alert={alert}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
    </main>
  );
}; 

export default SpecificProductPageContent;