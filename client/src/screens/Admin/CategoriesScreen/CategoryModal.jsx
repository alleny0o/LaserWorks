import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import styles from "./CategoryModal.module.scss";
import {
  getCategory,
  updateCategory,
  deleteCategory,
  getAllCategories
} from "../../../redux/actions/categoryActions";
import TextInput from "./FormComponents/TextInput";

const CategoryModal = ({ isOpen, category, handleCloseModal }) => {
  const dispatch = useDispatch();
  const { loading, error, currentCategory } = useSelector(
    (state) => state.category
  );

  const [initialValues, setInitialValues] = useState({
    name: "",
    slug: "",
  });

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

  useEffect(() => {
    if (currentCategory) {
      setInitialValues({
        name: currentCategory.name,
        slug: currentCategory.slug,
      });
    }
  }, [currentCategory]);

  useEffect(() => {
    if (category && category._id) {
      dispatch(getCategory(category._id));
    }
  }, [category, dispatch]);

  const handleSubmit = async (values, { setSubmitting, resetForm, setFieldError }) => {
    try {
      setSubmitting(true);
      await dispatch(updateCategory(currentCategory._id, values));
      toast.success("Successfully Updated Category");
      dispatch(getAllCategories());
      handleCloseModal();
    } catch (error) {
      setFieldError('submit', 'Failed to update category. Please try again.');
      toast.error(error.message || "Failed To Update Category");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    handleCloseModal();
    setInitialValues({
      name: "",
      slug: "",
    });
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteCategory(currentCategory._id));
      toast.success("Successfully Deleted Category");
      dispatch(getAllCategories());
      handleClose();
    } catch (error) {
      toast.error(error.message || "Failed To Delete Category");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.modalContainer}>
        <div className={styles.headerContainer}>
          <h2>Update/Delete Category</h2>
          <button onClick={handleClose}>&times;</button>
        </div>
        <div className={styles.formContainer}>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
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
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update"}
                  </button>
                  <button type="button" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className={styles.modalOverlay} onClick={handleClose}></div>
    </>
  );
};

export default CategoryModal;