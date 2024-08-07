import React from "react";
import { FieldArray, Field, ErrorMessage } from "formik";
import styles from "./CustomizedModal.module.scss";

const CustomizedModal = ({ values, setFieldValue, errors, touched }) => {
  return (
    <>
      <FieldArray
        name="customization"
        render={(arrayHelpers) => (
          <div className={styles.container}>
            {values.customization &&
              values.customization.map((step, index) => (
                <div key={index} className={styles.stepContainer}>
                  <div className={styles.stepTitleContainer}>
                    <h3>Step {index + 1}</h3>
                    {index > 0 && (
                      <button
                        type="button"
                        className={styles.removeStepButton}
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        Remove Step
                      </button>
                    )}
                  </div>

                  <div className={styles.section}>
                    <h4>Select the type of input:</h4>
                    <Field
                      name={`customization.${index}.fieldType`}
                      as="select"
                      className={styles.select}
                    >
                      <option value="" disabled>
                        Select An Option
                      </option>
                      <option value="select">Dropdown Input</option>
                      <option value="text">Text Input</option>
                      <option value="number">Number Input</option>
                      <option value="textarea">Textarea Input</option>
                    </Field>
                    <ErrorMessage
                      name={`customization.${index}.fieldType`}
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>

                  {step.fieldType && (
                    <>
                      <div className={styles.section}>
                        <h4>Main description:</h4>
                        <Field
                          name={`customization.${index}.label`}
                          placeholder="Enter description of what user should do..."
                          className={styles.input}
                        />
                        <ErrorMessage
                          name={`customization.${index}.label`}
                          component="div"
                          className={styles.errorMessage}
                        />
                      </div>

                      <FieldArray
                        name={`customization.${index}.moreDetails`}
                        render={(detailHelpers) => (
                          <div className={styles.section}>
                            <div className={styles.detailTitle}>
                              <h4>Sub descriptions To Guide User (Optional)</h4>
                              <button
                                type="button"
                                className={styles.addButton}
                                onClick={() => detailHelpers.push({ text: "" })}
                              >
                                Add
                              </button>
                            </div>
                            {step.moreDetails &&
                              step.moreDetails.map((detail, detailIndex) => (
                                <div key={detailIndex}>
                                  <div className={styles.detailContainer}>
                                    <div
                                      className={styles.detailInnerContainer}
                                    >
                                      <Field
                                        name={`customization.${index}.moreDetails.${detailIndex}.text`}
                                        placeholder={`Sub description text ${
                                          detailIndex + 1
                                        }`}
                                        className={styles.input}
                                      />

                                      <button
                                        type="button"
                                        className={styles.removeDetailButton}
                                        onClick={() =>
                                          detailHelpers.remove(detailIndex)
                                        }
                                      >
                                        <i
                                          className={`bx bx-trash ${styles.trashIcon}`}
                                        ></i>
                                      </button>
                                    </div>
                                    <ErrorMessage
                                      name={`customization.${index}.moreDetails.${detailIndex}.text`}
                                      component="div"
                                      className={styles.errorMessage}
                                    />
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                      />
                    </>
                  )}

                  {step.fieldType === "select" && (
                    <FieldArray
                      name={`customization.${index}.options`}
                      render={(optionHelpers) => (
                        <div className={styles.section}>
                          <div className={styles.optionTitle}>
                            <h4>Dropdown options (1 required)</h4>
                            <button
                              type="button"
                              className={styles.addButton}
                              onClick={() =>
                                optionHelpers.push({
                                  text: "",
                                  isDisabled: false,
                                })
                              }
                            >
                              Add
                            </button>
                          </div>
                          <div className={styles.optionsGrid}>
                            {step.options && step.options.length > 0 ? (
                              step.options.map((option, optionIndex) => (
                                <div
                                  key={optionIndex}
                                  className={styles.optionContainer}
                                >
                                  <div
                                    className={styles.checkboxInnerContainer}
                                  >
                                    <Field
                                      name={`customization.${index}.options.${optionIndex}.text`}
                                      placeholder={`Option ${optionIndex + 1}`}
                                      className={styles.input}
                                    />
                                    {optionIndex > 0 && (
                                      <button
                                        type="button"
                                        className={styles.removeOptionButton}
                                        onClick={() =>
                                          optionHelpers.remove(optionIndex)
                                        }
                                      >
                                                                                <i
                                          className={`bx bx-trash ${styles.trashIcon}`}
                                        ></i>
                                      </button>
                                    )}
                                  </div>

                                  <div className={styles.checkboxContainer}>
                                    <Field
                                      name={`customization.${index}.options.${optionIndex}.isDisabled`}
                                      type="checkbox"
                                      id={`option-disabled-${index}-${optionIndex}`}
                                    />
                                    <label
                                      htmlFor={`option-disabled-${index}-${optionIndex}`}
                                    >
                                      Disabled
                                    </label>
                                  </div>
                                  <ErrorMessage
                                    name={`customization.${index}.options.${optionIndex}.text`}
                                    component="div"
                                    className={styles.errorMessage}
                                  />
                                </div>
                              ))
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div>
                      )}
                    />
                  )}

                  {step.fieldType && (
                    <div className={styles.section}>
                      <h4>Is Step Required?</h4>
                      <Field
                        name={`customization.${index}.isRequired`}
                        as="select"
                        className={styles.select}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </Field>
                      <ErrorMessage
                        name={`customization.${index}.isRequired`}
                        component="div"
                        className={styles.errorMessage}
                      />
                    </div>
                  )}
                </div>
              ))}

            <button
              type="button"
              className={styles.addButton}
              onClick={() =>
                arrayHelpers.push({
                  fieldType: "",
                  label: "",
                  isRequired: "Yes",
                  options: [{text: "", isDisabled: false}],
                  moreDetails: [],
                })
              }
            >
              Add Step
            </button>
          </div>
        )}
      />
    </>
  );
};

export default CustomizedModal;
