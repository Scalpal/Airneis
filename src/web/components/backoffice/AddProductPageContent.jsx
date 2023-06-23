import styles from "@/styles/backoffice/AddProductPageContent.module.css"; 
import BackButton from "./BackButton";
import { Field, FieldArray, Form, Formik } from "formik";
import { createValidator, numberValidator, stringValidator } from "@/validator";
import LoginField from "../LoginField";
import { splitCamelCase } from "@/web/services/SplitCamelCase";
import Button from "../Button";
import { useGetCategories } from "@/web/hooks/useGetCategories";
import { useGetMaterials } from "@/web/hooks/useGetMaterials";
import { useCallback, useState } from "react";
import CollapseMenu from "../CollapseMenu";
import CheckboxItem from "../CheckboxItem";
import routes from "@/web/routes";
import useAppContext from "@/web/hooks/useAppContext";
import CustomAlert from "../CustomAlert";
import uploadProductImage from "@/web/services/products/uploadProductImage";
import ProductImageInput from "../ProductImageInput";
import { XMarkIcon } from "@heroicons/react/24/solid";

const validationSchema = createValidator({
  name: stringValidator.required(),
  description: stringValidator.required(),
  price: numberValidator.required(),
  stock: numberValidator.required(),
  categoryId: numberValidator.required(),
});

const initialValues = {
  name: "",
  description: "",
  price: 0,
  stock: 0,
  categoryId: "",
  materials: [],
  productImages: []
};

const mappableKeys = ["name", "description", "price", "stock"];

const AddProductPageContent = (props) => {
  const { setShowModal, updateProducts } = props; 
  const { actions: { api } } = useAppContext();
  const { materialsData, materialsError, materialsIsLoading } = useGetMaterials();
  const materials = (!materialsIsLoading && !materialsError) ? materialsData : [];

  const { categoriesData, categoriesError, categoriesIsLoading } = useGetCategories();
  const categories = (!categoriesIsLoading && !categoriesError) ? categoriesData : [];

  const [alert, setAlert] = useState({ status: "", message: "" });
  const [showAlert, setShowAlert] = useState(false);
  const [imagesToUpload, setImagesToUpload] = useState([]);

  const handleSubmit = useCallback(async(values, { resetForm }) => {
    values.price = Number.parseInt(values.price);
    values.stock = Number.parseInt(values.stock);

    const materials = values.materials.reduce((acc, { id }) => [...acc, id], []);
    values.materials = materials;

    try {
      const { data } = await api.post(routes.api.products.add(), values);

      if (imagesToUpload.length > 0) {
        imagesToUpload.map(async(imageFile) => {
          const [error] = await uploadProductImage(imageFile, data.product.id);

          if (error) {
            setAlert({ status: "error" , message: "Error on add." });
            setShowAlert(true);

            return;
          }
        });
      } 

      setAlert({ status: "success" , message: data.message });
      setShowAlert(true);
      updateProducts();
      resetForm(); 
    } catch (error) {
      setAlert({ status: 500, message: error });
      setShowAlert(true);
    }
  }, [api, updateProducts, imagesToUpload]);

  const isMaterialChecked = (values, id) => {
    const productMaterialIds = values.reduce((acc, { id }) => [...acc, id], []); 
      
    return productMaterialIds.includes(id) ? true : false;
  };

  const removeImage = useCallback((index) => {
    const updatedImagesToUpload = imagesToUpload.filter((_, i) => i !== index); 

    setImagesToUpload(updatedImagesToUpload);
  }, [imagesToUpload]);

  return (

    <main className={styles.main}>
      <BackButton setShowModal={setShowModal} />

      <p className={styles.title}>Add a product</p>

      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        enableReinitialize={true}
        initialValues={initialValues}
      >
        {({ values, isValid, dirty, isSubmitting }) => {
          return (
            <Form className={styles.container}>
              <div className={styles.contentWrapper}>
                <div className={styles.contentLeft}>
                  <div className={styles.contentTitleWrapper}>
                    <p className={styles.contentTitle}>Product informations</p>
                  </div>

                  <div className={styles.contentLeftForm}>
                    {Object.entries(initialValues).map(([key], index) => (
                      mappableKeys.includes(key) && (
                        <LoginField
                          key={index}
                          name={key}
                          type={"text"}
                          label={splitCamelCase(key)}
                          showError={true}
                        /> 
                      )
                    ))}

                    <div className={styles.categorySelectWrapper}>
                      <p className={styles.contentTitle}> Category </p>

                      <Field name="categoryId" as="select" className={styles.select}>
                        <option disabled>Category</option>
                          {categories.map(({ id, name }, index) => (
                            <option key={index} value={id}>
                              {id} - {name}
                            </option>
                          ))}
                      </Field>
                    </div>

                  </div>
                </div>

                <div className={styles.contentRight}>
                  <div className={styles.contentTitleWrapper}>
                    <p className={styles.contentTitle}>Product images</p>

                    <div className={styles.productImagesContainer}>
                      {imagesToUpload.length > 0 && (
                        <div className={styles.productImageRowWrapper}>
                          {imagesToUpload.map((imageFile, index) => {
                            return (
                              <p
                                key={index}
                                className={styles.productImageRow}
                                onClick={() => removeImage(index)}
                              >
                                Image {index + 1} : {imageFile.name}

                                <XMarkIcon className={styles.productImageRowIcon} />
                              </p>
                            );
                          })}
                        </div>
                        )
                      }

                      <ProductImageInput
                        images={imagesToUpload}
                        onChangeEvent={setImagesToUpload}
                      />
                    </div>
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
                              />
                            )
                          )}
                        </CollapseMenu>
                    )}
                  </FieldArray>
                </div>
              </div>

              <div className={styles.submitButtonWrapper}>
                <Button
                  type={"submit"}
                  disabled={!(dirty && isValid) || isSubmitting}
                >
                  Add
                </Button>
              </div>
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

export default AddProductPageContent;