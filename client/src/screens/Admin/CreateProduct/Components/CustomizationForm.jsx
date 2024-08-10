import React from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Textarea,
  Input,
  useBreakpointValue,
  useColorModeValue,
  Select,
} from "@chakra-ui/react";
import { FieldArray, Field, ErrorMessage } from "formik";
import FormSubdetails from "../FormComponents/FormSubdetails";
import FormDropdownOptions from "../FormComponents/FormDropdownOptions";

const CustomizationForm = ({ values, errors, touched, setFieldValue }) => {
  const handleTypeSelection = (index, type) => {
    setFieldValue(`customization[${index}].fieldType`, type);
  };

  const boxBg = useColorModeValue("gray.50", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const shadow = useColorModeValue("sm", "md");

  return (
    <Flex w="100%" justifyContent="center" alignItems="center" p={2}>
      <Box
        w="100%"
        bg={boxBg}
        p={{ base: 2, md: 4 }}
        borderRadius="md"
        boxShadow={shadow}
      >
        <FieldArray
          name="customization"
          render={(arrayHelpers) => (
            <VStack spacing={4} align="stretch">
              {values.customization &&
                values.customization.map((step, index) => (
                  <Box
                    key={index}
                    borderWidth="1px"
                    borderColor={borderColor}
                    borderRadius="md"
                    p={3}
                    mb={2}
                    bg={boxBg}
                    boxShadow="sm"
                  >
                    <Flex
                      justifyContent="space-between"
                      alignItems="center"
                      mb={2}
                    >
                      <Text fontSize="md" fontWeight="bold">
                        Step {index + 1}
                      </Text>
                      {index > 0 && (
                        <Button
                          onClick={() => arrayHelpers.remove(index)}
                          colorScheme="red"
                          size="xs"
                        >
                          Delete Step
                        </Button>
                      )}
                    </Flex>
                    <FormControl
                      isInvalid={
                        touched.customization?.[index]?.fieldType &&
                        errors.customization?.[index]?.fieldType
                      }
                      isRequired
                      mb={2}
                    >
                      <FormLabel htmlFor={`customization[${index}].fieldType`} fontSize="sm">
                        Field Type:
                      </FormLabel>
                      <Stack
                        direction={{ base: "column", md: "row" }}
                        spacing={1}
                      >
                        {["Dropdown", "Text", "Textarea", "Number"].map(
                          (type) => (
                            <Button
                              key={type}
                              onClick={() => handleTypeSelection(index, type)}
                              variant={
                                step.fieldType === type ? "solid" : "outline"
                              }
                              size="xs"
                            >
                              {type}
                            </Button>
                          )
                        )}
                      </Stack>
                      <ErrorMessage
                        name={`customization[${index}].fieldType`}
                        component={FormErrorMessage}
                      />
                    </FormControl>
                    {step.fieldType && (
                      <>
                        <FormControl
                          isRequired
                          mb={2}
                          isInvalid={
                            touched.customization?.[index]?.mainDescription &&
                            errors.customization?.[index]?.mainDescription
                          }
                        >
                          <FormLabel
                            htmlFor={`customization[${index}].mainDescription`}
                            fontSize="sm"
                          >
                            Main Description
                          </FormLabel>
                          <Field
                            as={Textarea}
                            id={`customization[${index}].mainDescription`}
                            name={`customization[${index}].mainDescription`}
                            placeholder="Enter the main description..."
                            resize="vertical"
                            minHeight="40px"
                            size="sm"
                          />
                          <ErrorMessage
                            name={`customization[${index}].mainDescription`}
                            component={FormErrorMessage}
                          />
                        </FormControl>

                        {step.fieldType !== "Dropdown" && (
                          <FormControl mb={2}>
                            <FormLabel
                              htmlFor={`customization[${index}].placeholder`}
                              fontSize="sm"
                            >
                              Placeholder
                            </FormLabel>
                            <Field
                              as={Input}
                              id={`customization[${index}].placeholder`}
                              name={`customization[${index}].placeholder`}
                              placeholder="Enter input placeholder..."
                              size="sm"
                            />
                          </FormControl>
                        )}

                        <FormSubdetails
                          name={`customization[${index}].subDescriptions`}
                          values={step.subDescriptions}
                        />
                      </>
                    )}

                    {step.fieldType === "Dropdown" && (
                      <FormDropdownOptions
                        name={`customization[${index}].options`}
                        values={step.options}
                      />
                    )}

                    {step.fieldType !== "" && (
                      <FormControl
                        isRequired
                        mt={2}
                        isInvalid={
                          touched.customization?.[index]?.isRequired &&
                          errors.customization?.[index]?.isRequired
                        }
                      >
                        <FormLabel
                          htmlFor={`customization[${index}].isRequired`}
                          fontSize="sm"
                        >
                          Step Required?
                        </FormLabel>
                        <Field
                          as={Select}
                          id={`customization[${index}].isRequired`}
                          name={`customization[${index}].isRequired`}
                          placeholder="Select option"
                          size="sm"
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Field>
                        <ErrorMessage
                          name={`customization[${index}].isRequired`}
                          component={FormErrorMessage}
                        />
                      </FormControl>
                    )}
                  </Box>
                ))}
              <Button
                onClick={() =>
                  arrayHelpers.push({
                    fieldType: "",
                    mainDescription: "",
                    isRequired: "Yes",
                    subDescriptions: [],
                    options: [{ text: "", isDisabled: false }],
                  })
                }
                colorScheme="blue"
                size="xs"
              >
                Add Step
              </Button>
            </VStack>
          )}
        />
      </Box>
    </Flex>
  );
};

export default CustomizationForm;