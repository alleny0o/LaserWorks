import CustomizedModal from "../../../components/CreateProductUtils/CustomizedModal";
import styles from "./CreateProductScreen.module.scss";

const CustomizationSection = ({ values, setFieldValue, errors, touched }) => {
  return (
    <CustomizedModal
      values={values}
      setFieldValue={setFieldValue}
      errors={errors}
      touched={touched}
    />
  );
};

export default CustomizationSection;