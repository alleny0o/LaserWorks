import styles from "./CreateProductScreen.module.scss";
import { useState, useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductTypes, createProduct } from "../../../redux/actions/productActions";
import { getAllCategories } from "../../../redux/actions/categoryActions";
import { toast } from 'react-toastify';
import ProductDetailsForm from './ProductDetailsForm';
import MediaUploadSection from './MediaUploadSection';

const CreateProductScreen = () => {
  const [selectedProductTypeName, setSelectedProductTypeName] = useState("");
  const formikRef = useRef();

  const dispatch = useDispatch();
  const { productTypes } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllProductTypes());
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (formikRef.current) {
      formikRef.current.setFieldValue("customization", []);
    }
    if (selectedProductTypeName === "Customized Product") {
      formikRef.current.setFieldValue("customization", [
        {
          fieldType: "",
          label: "",
          isRequired: "Yes",
          moreDetails: [],
          options: [{ text: "", isDisabled: false }],
        },
      ]);
    }
  }, [selectedProductTypeName]);

  const initialValues = {
    name: "",
    productType: "",
    price: "",
    discountPrice: "",
    categories: [],
    thumbnail: null,
    files: [],
    customization: [],
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    productType: Yup.string().required("Must select Product Type"),
    price: Yup.number()
      .positive("Price must be positive")
      .required("Price is required"),
    discountPrice: Yup.number()
      .positive("Discount price must be positive")
      .test(
        "is-less-than-price",
        "Discount price should be less than regular price",
        function (value) {
          return !value || value < this.parent.price;
        }
      ),
    categories: Yup.array().of(Yup.string()),
    files: Yup.array()
      .min(1, "Please upload at least one image")
      .test("has-image", "Please upload at least one image", function (value) {
        return value && value.some((file) => file.type.startsWith("image/"));
      }),
    thumbnail: Yup.number()
      .nullable()
      .test(
        "thumbnail-required",
        "Please select a thumbnail image",
        function (value) {
          return this.parent.files.length === 0 || value !== null;
        }
      ),
    customization: Yup.array().of(
      Yup.object().shape({
        fieldType: Yup.string().required("Type of input is required"),
        label: Yup.string().required("Description is required"),
        isRequired: Yup.string().required("Must choose this option"),
        moreDetails: Yup.array().of(
          Yup.object().shape({
            text: Yup.string()
          })
        ),
        options: Yup.array().of(
          Yup.object().shape({
            text: Yup.string(),
            isDisabled: Yup.boolean()
          })
        )
      })
    )
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError, resetForm }) => {
    console.log("Form submitted with values:", values);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("productType", values.productType);
    formData.append("price", values.price);
  
    if (values.discountPrice) {
      formData.append("discountPrice", values.discountPrice);
    } else {
      formData.append("discountPrice", -1);
    }
  
    if (values.categories) {
      formData.append("categories", JSON.stringify(values.categories));
    } else {
      formData.append("categories", JSON.stringify([]));
    }
  
    values.files.forEach(file => {
      formData.append('medias', file);
    });
  
    if (values.thumbnail !== null) {
      formData.append('thumbnail', values.thumbnail);
    }
  
    if (values.customization && values.customization.length > 0) {
      formData.append('customization', JSON.stringify(values.customization));
    } else {
      formData.append('customization', JSON.stringify([]));
    }
  
    try {
      console.log("Attempting to dispatch createProduct");
      setSubmitting(true);
      await dispatch(createProduct(formData));
      toast.success("Successfully created new product :)");
      resetForm();
      setSelectedProductTypeName("");
    } catch (error) {
      console.error('Error creating product:', error);
      setFieldError('submit', 'Failed to create product. Please try again.');
      toast.error("Failed to create product. Please try again. :(");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.main__container}>
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          isSubmitting,
          setFieldValue,
          values,
          errors,
          touched,
        }) => {
          return (
            <Form className={styles.container}>
              <h1 className={styles.title}>Create Product Form</h1>

              <MediaUploadSection
                values={values}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
              />

              <ProductDetailsForm
                productTypes={productTypes}
                categories={categories}
                selectedProductTypeName={selectedProductTypeName}
                setSelectedProductTypeName={setSelectedProductTypeName}
                setFieldValue={setFieldValue}
                values={values}
                errors={errors}
                touched={touched}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                Create Product
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateProductScreen;