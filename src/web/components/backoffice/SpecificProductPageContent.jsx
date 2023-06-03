import { classnames, nunito } from "@/pages/_app";
import styles from "@/styles/backoffice/SpecificProductPageContent.module.css";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { FieldArray, Form, Formik } from "formik";
import LoginField from "../LoginField";
import { useCallback, useState } from "react";
import Button from "../Button";
import CustomAlert from "../CustomAlert";
import { createValidator, numberValidator, stringValidator } from "@/validator";
import { splitCamelCase } from "@/web/services/SplitCamelCase";
import useAppContext from "@/web/hooks/useAppContext";
import routes from "@/web/routes";
import { AxiosError } from "axios";
import CollapseMenu from "../CollapseMenu";
import { useGetMaterials } from "@/web/hooks/useGetMaterials";
import CheckboxItem from "../CheckboxItem";
import BackButton from "./BackButton";

const validationSchema = createValidator({
  name: stringValidator.required(),
  description: stringValidator.required(),
  price: numberValidator.required(),
  stock: numberValidator.required(),
  categoryId: numberValidator.required(),
});

const SpecificProductPageContent = (props) => {
  const { product, updateProducts, setShowModal } = props;
  const { actions: { api } } = useAppContext();
  const { materialsData, materialsError, materialsIsLoading } = useGetMaterials(); 

  const [currentProduct, setCurrentProduct] = useState(product);
  const [editMode, setEditMode] = useState(false);
  const [alert, setAlert] = useState({ status: "", message: "" });
  const [showAlert, setShowAlert] = useState(false);

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
    const materials = values.materials.reduce((acc, { id }) => [...acc, id], []);
    values.materials = materials;
    
    try {
      const { data } = await api.patch(routes.api.products.single(currentProduct.id), values);

      setEditMode(false);
      setCurrentProduct(data.product[0]);
      setShowAlert(true);
      setAlert({ status: data.status, message: data.message });
      updateProducts();
    } catch (error) {
      if (error instanceof AxiosError) {
        setShowAlert(true);
        setAlert({ status: error.response.status, message: error.response.message });
      }
    }
  }, [api, currentProduct.id, updateProducts]); 

    const isMaterialChecked = (values, id) => {
    const productMaterialIds = values.reduce((acc, { id }) => [...acc, id], []); 
       
    return productMaterialIds.includes(id) ? true : false;
  };

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
        {({ values, isValid, dirty, isSubmitting, handleReset }) => {
            return (
              <Form className={styles.contentWrapper}>
                <div className={styles.contentLeft}>
                  <div className={styles.contentTitleWrapper}>
                    <p className={styles.contentTitle}>Informations</p>

                    <PencilSquareIcon
                      className={styles.titleIcon}
                      onClick={() => handleEditMode("informations", handleReset)}
                    />
                  </div>

                  {Object.entries(initialValues).map(([key, value], index) => (
                    !Array.isArray(value) && (
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

                  {editMode && (
                    <Button
                      type={"submit"}
                      disabled={!(dirty && isValid) || isSubmitting}
                    >
                      Save
                    </Button>
                  )}
                </div>

                <FieldArray name="materials">
                  {({ push, remove }) => (
                    <div className={styles.contentRight}>
                      <CollapseMenu title="Materials" size="fit-to-parent">
                        {(!materialsError && !materialsIsLoading) && (
                          materialsData.map(({ id, name }, index) => (
                            <CheckboxItem
                              key={index}
                              name={name}
                              value={id}
                              onClick={() => !isMaterialChecked(values.materials, id) ? push({ id: id, name: name }) : remove(values.materials.findIndex(elt => elt.id === id))}
                              checked={isMaterialChecked(values.materials, id)}
                              disabled={!editMode}
                            />
                          ))
                        )}
                      </CollapseMenu>
                    </div>
                  )}
                </FieldArray>
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