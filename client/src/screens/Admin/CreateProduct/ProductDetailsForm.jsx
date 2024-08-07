import { Field, ErrorMessage } from "formik";
import styles from "./CreateProductScreen.module.scss";
import CategorySelection from "./CategorySelection";
import CustomizationSection from "./CustomizationSection";

const ProductDetailsForm = ({
  productTypes,
  categories,
  selectedProductTypeName,
  setSelectedProductTypeName,
  setFieldValue,
  values,
  errors,
  touched,
}) => {
  return (
    <div className={styles.productDetailsContainer}>
      {/* Product Name Field */}
      <div className={`${styles.textFieldContainer} ${styles.spanTwoCols}`}>
        <label htmlFor="name" className={styles.inputFields}>
          Product Name <span className={styles.requiredStar}>*</span>
        </label>
        <Field
          name="name"
          type="text"
          placeholder="Enter Product Name..."
          className={styles.inputStyles}
        />
        <ErrorMessage
          name="name"
          component="div"
          className={styles.errorMessage}
        />
      </div>

      {/* Product Type Field */}
      <div className={`${styles.textFieldContainer} ${styles.spanTwoCols}`}>
        <label htmlFor="productType">
          Product Type <span className={styles.requiredStar}>*</span>
        </label>
        <Field
          as="select"
          name="productType"
          className={styles.selectStyles}
          onChange={(e) => {
            const selectedValue = e.target.value;
            setFieldValue("productType", selectedValue);
            setSelectedProductTypeName(selectedValue);
          }}
        >
          <option value="" disabled>
            Select an option
          </option>
          {Object.entries(productTypes).map(([key, type]) => (
            <option key={key} value={type.name}>
              {type.name}
            </option>
          ))}
        </Field>
        <ErrorMessage
          name="productType"
          component="div"
          className={styles.errorMessage}
        />

        {selectedProductTypeName === "Customized Product" && (
          <CustomizationSection
            values={values}
            setFieldValue={setFieldValue}
            errors={errors}
            touched={touched}
          />
        )}
      </div>

      <CategorySelection categories={categories} />

      {/* Price Fields */}
      <div className={styles.textFieldContainer}>
        <label htmlFor="price">
          Product Price <span className={styles.requiredStar}>*</span>
        </label>
        <Field
          name="price"
          type="number"
          placeholder="Enter product price..."
          className={styles.inputStyles}
        />
        <ErrorMessage
          name="price"
          component="div"
          className={styles.errorMessage}
        />
      </div>

      <div className={styles.textFieldContainer}>
        <label htmlFor="discountPrice">Product Discount Price</label>
        <Field
          name="discountPrice"
          type="number"
          placeholder="Enter product discount price..."
          className={styles.inputStyles}
        />
        <ErrorMessage
          name="discountPrice"
          component="div"
          className={styles.errorMessage}
        />
      </div>
    </div>
  );
};

export default ProductDetailsForm;