import { Box, FormControl, FormLabel, FormErrorMessage, VStack, Select } from "@chakra-ui/react";
import { Field } from 'formik';
import { useState, useEffect } from 'react';
import CustomizationForm from "./CustomizationForm";

const ProductCustomization = ({ values, errors, touched, setFieldValue }) => {
  const [isCustomizable, setIsCustomizable] = useState(false);

  const handleDropdown = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'yes') {
      setFieldValue('customizable', true);
      setIsCustomizable(true);
    } else if (selectedValue === 'no') {
      setFieldValue('customizable', false);
      setIsCustomizable(false);
    } else {
      setIsCustomizable(false);
      setFieldValue('customizable', false);
    }
  };

  useEffect(() => {
    if (isCustomizable) {
      setFieldValue('customizable', true);
      setFieldValue('customization', 
        [
          {
            fieldType: "",
            label: "",
            isRequired: "Yes",
            moreDetails: [],
            options: [{ text: "", isDisabled: false }],
          },
        ]
      );
    } else {
      setFieldValue('customizable', false);
      setFieldValue('customization', []);
    }
  }, [isCustomizable, setFieldValue]);

  return (
    <Box>
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={touched.customizable && errors.customizable}>
          <FormLabel htmlFor="product-type">Is Product Needed For Customization?</FormLabel>
          <Field name="product-type">
            {({ field }) => (
              <Select
                {...field}
                id="product-type"
                onChange={(e) => {
                  handleDropdown(e);
                  field.onChange(e); 
                }}
              >
                <option value="" disabled selected>Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Select>
            )}
          </Field>
          <FormErrorMessage>{errors.customizable}</FormErrorMessage>
        </FormControl>
        {isCustomizable && (
          <CustomizationForm 
            values={values}
            errors={errors}
            touched={touched}
            setFieldValue={setFieldValue}
          />
        )}
      </VStack>
    </Box>
  );
}

export default ProductCustomization;
