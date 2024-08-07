import MediaDropzone from "../../../components/CreateProductUtils/MediaDropzone";
import styles from "./CreateProductScreen.module.scss";

const MediaUploadSection = ({ values, setFieldValue, errors, touched }) => {
  const handleFileChange = (newFiles, setFieldValue) => {
    setFieldValue("files", newFiles);
  };

  return (
    <div className={styles.mediaDropdown}>
      <MediaDropzone
        files={values.files}
        thumbnail={values.thumbnail}
        onFileChange={(newFiles) =>
          handleFileChange(newFiles, setFieldValue)
        }
        onThumbnailChange={(index) => {
          if (index === values.thumbnail) {
            setFieldValue("thumbnail", null);
          } else {
            setFieldValue("thumbnail", index);
          }
        }}
        filesError={touched.files && errors.files}
        thumbnailError={touched.thumbnail && errors.thumbnail}
      />
    </div>
  );
};

export default MediaUploadSection;