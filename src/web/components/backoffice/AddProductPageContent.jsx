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
  materials: []
};

const mappableKeys = ["name", "description", "price", "stock"];

const AddProductPageContent = (props) => {
  const { setShowModal, updateProducts } = props; 
  const { actions: { api } } = useAppContext();
  const { materialsData, materialsError, materialsIsLoading } = useGetMaterials();
  const { categoriesData, categoriesError, categoriesIsLoading } = useGetCategories();

  const [alert, setAlert] = useState({ status: "", message: "" });
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = useCallback(async(values, { resetForm }) => {
    values.price = Number.parseInt(values.price);
    values.stock = Number.parseInt(values.stock);

    const materials = values.materials.reduce((acc, { id }) => [...acc, id], []);
    values.materials = materials;

    try {
      const { data } = await api.post(routes.api.products.add(), values);

      setAlert({ status: "success" , message: data.message });
      setShowAlert(true);
      updateProducts();
      resetForm(); 
    } catch (error) {
      setAlert({ status: 500, message: error });
      setShowAlert(true);
    }
  }, [api, updateProducts]);

    const isMaterialChecked = (values, id) => {
      const productMaterialIds = values.reduce((acc, { id }) => [...acc, id], []); 
        
      return productMaterialIds.includes(id) ? true : false;
    };

  return (
    <main
      className={styles.main}
    >
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
                        {(!categoriesError && !categoriesIsLoading) && categoriesData.map(({ id, name }, index) => (
                          <option key={index} value={id}>
                            {id} - {name}
                          </option>
                        ))}
                    </Field>
                    </div>

                  </div>
                </div>

                <FieldArray name="materials">
                  {({ push, remove }) => (
                    <div className={styles.contentRight}>
                      <CollapseMenu title="Materials" defaultCollapsed={true} size="medium">
                        {(!materialsError && !materialsIsLoading) && (
                          materialsData.map(({ id, name }, index) => (
                            <CheckboxItem
                              key={index}
                              name={name}
                              value={id}
                              onChange={() => !isMaterialChecked(values.materials, id) ? push({ id: id, name: name }) : remove(values.materials.findIndex(elt => elt.id === id))}
                              checked={isMaterialChecked(values.materials, id)}
                            />
                          ))
                        )}
                      </CollapseMenu>
                    </div>
                  )}
                </FieldArray>
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