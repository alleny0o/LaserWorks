import { Field, ErrorMessage } from "formik";
import styles from "./CreateProductScreen.module.scss";

const CategorySelection = ({ categories = [] }) => {
  return (
    <div className={`${styles.textFieldContainer} ${styles.spanTwoCols}`}>
      <label>Categories Product Embodies</label>
      <div className={styles.categoriesContainer}>
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => (
            <div key={category._id} className={styles.categoryItem}>
              <Field
                type="checkbox"
                name="categories"
                value={category._id}
                id={`category-${category._id}`}
              />
              <label htmlFor={`category-${category._id}`}>
                {category.name}
              </label>
            </div>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>
      <ErrorMessage
        name="categories"
        component="div"
        className={styles.errorMessage}
      />
    </div>
  );
};

export default CategorySelection;
