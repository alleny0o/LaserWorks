import styles from './TextInput.module.scss';
import { useField } from 'formik';

const TextInput = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.container}>
      <label className={styles.label} tmlFor={props.id || props.name}>{label} <span className={styles.requiredStar}>*</span></label>
      <input className={styles.input} {...field} {...props}/>
      {meta.touched && meta.error ? (
        <div className={styles.errorMessage}>{meta.error}</div>
      ) : (
        null
      )}
    </div>
  )
}

export default TextInput