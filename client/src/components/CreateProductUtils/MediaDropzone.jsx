import styles from "./MediaDropzone.module.scss";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const MediaDropzone = ({
  files,
  thumbnail,
  onFileChange,
  onThumbnailChange,
  filesError,
  thumbnailError,
}) => {
  const [rejected, setRejected] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles?.length) {
        const newFiles = acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );
        onFileChange([...files, ...newFiles]);
      }
      if (rejectedFiles?.length) {
        setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
      }
    },
    [files, onFileChange]
  );

  const removeImage = (name) => {
    const updatedFiles = files.filter((file) => file.name !== name);
    onFileChange(updatedFiles);
    
    if (updatedFiles.length === 0 || files.findIndex(file => file.name === name) === thumbnail) {
      onThumbnailChange(null);
    }
  };

  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "video/*": [],
    },
    maxSize: 60000000, // 60MB for approximately 1 minute video
  });

  return (
    <div className={styles.container}>
      <h4 className={styles.heading}>
        Upload Product Media Here
      </h4>
      <div {...getRootProps()} className={styles.dropzone}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      {filesError && (
        <div className={`${styles.errorMessage} ${styles.errorMessageMargin}`}>{filesError}</div>
      )}
      {/* ACCEPTED FILES SECTION */}
      <h4 className={`${styles.sectionTitle} ${styles.marginTop}`}>
        Current Attached Media
      </h4>
      {thumbnailError && !filesError && (
        <div className={styles.errorMessage}>{thumbnailError}</div>
      )}
      <ul className={styles.mediaGrid}>
        {files.map((file, index) => (
          <li key={file.name} className={styles.mediaItem}>
            <div className={styles.mediaContainer}>
              <div
                className={styles.removeButton}
                onClick={() => removeImage(file.name)}
              >
                <i className={`bx bx-x ${styles.removeIcon}`}></i>
              </div>
              {file.type.startsWith("image/") ? (
                <>
                  <img
                    src={file.preview}
                    className={styles.mediaImage}
                    alt="Product Media"
                    onLoad={() => URL.revokeObjectURL(file.preview)}
                    onClick={() => onThumbnailChange(index)}
                  />
                  {(thumbnail === index) && (
                    <div className={styles.thumbnailIndicator}>
                      Current Thumbnail
                    </div>
                  )}
                </>
              ) : (
                <video
                  src={file.preview}
                  className={styles.mediaVideo}
                  controls
                />
              )}
            </div>
          </li>
        ))}
      </ul>
      {/* REJECTED MEDIA SECTION */}
      <h4
        className={`${
          rejected.length !== 0
            ? styles.sectionTitleActive
            : styles.sectionTitleNone
        } ${styles.sectionTitle} ${styles.marginTop}`}
      >
        Rejected Media
      </h4>
      <ul className={`${styles.rejectedList}`}>
        {rejected.map(({ file, errors }) => (
          <li key={file.name} className={styles.rejectedItem}>
            <div>
              <p className={styles.rejectedItemName}>{file.name}</p>
              <ul className={styles.errorsList}>
                {errors.map((error) => (
                  <li key={error.code}>{error.message}</li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              className={styles.removeRejectedItem}
              onClick={() => removeRejected(file.name)}
            >
              Clear
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MediaDropzone;