import styles from "./CategoriesScreen.module.scss";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  getAllCategories,
  createCategory,
} from "../../../redux/actions/categoryActions";

// Sub-components
import AllCategories from "./AllCategories";

// Helper Components
import TextInput from "./FormComponents/TextInput";

const CategoriesScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, categories } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const initialValues = {
    name: "",
    slug: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Category name is required"),
    slug: Yup.string()
      .required("Category slug is required")
      .matches(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug must be lowercase, contain only letters, numbers, and hyphens, and not start or end with a hyphen"
      )
      .max(100, "Slug must be at most 100 characters long"),
  });

  const createCategorySubmit = async (
    values,
    { setSubmitting, setFieldError, resetForm }
  ) => {
    try {
      setSubmitting(true);
      await dispatch(createCategory(values));
      toast.success('Successfully Created Category');
      resetForm();
      dispatch(getAllCategories());
    } catch (error) {
      setFieldError('submit', 'Failed to create category. Please try again.');
      toast.error(error.message || "Failed To Create Category");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.slugContainer}>
          <h4>What is a slug?</h4>
          <p>
            A URL-friendly version of a string, used to create readable and
            SEO-friendly URLs.
          </p>
          <code className={styles.example}>
            Category Name: "My New Post"
            <br />
            Category Slug: my-new-post
          </code>
        </div>
        <div className={styles.formContainer}>
          <h1 className={styles.formTitle}>Create Category Form</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={createCategorySubmit}
          >
            {({ isSubmitting, setFieldValue, values, errors, touched }) => {
              return (
                <Form>
                  <TextInput
                    label="Category Name"
                    name="name"
                    type="text"
                    placeholder="Enter category name..."
                  />

                  <TextInput
                    label="Category Slug"
                    name="slug"
                    type="text"
                    placeholder="Enter category slug..."
                  />
                  <div className={styles.buttonContainer}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={styles.submitButton}
                    >
                      Create Category
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        <div className={styles.allCategories}>
          <AllCategories loading={loading} error={error} categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default CategoriesScreen;