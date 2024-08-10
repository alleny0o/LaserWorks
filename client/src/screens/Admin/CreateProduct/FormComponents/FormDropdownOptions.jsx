import React from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  IconButton,
  Button,
  SimpleGrid,
  Box,
  useBreakpointValue,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { FieldArray, Field } from "formik";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

const FormDropdownOptions = ({ name, values }) => {
  const gridColumns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 });

  return (
    <FormControl mt={2}>
      <HStack justify="space-between" align="center">
        <FormLabel isRequired fontSize="sm" mb={0}>Dropdown Options (1 Required)</FormLabel>
        <FieldArray
          name={name}
          render={(arrayHelpers) => (
            <Button
              onClick={() => arrayHelpers.push({ text: "", isDisabled: false })}
              size="xs"
              colorScheme="teal"
            >
              Add
            </Button>
          )}
        />
      </HStack>
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={2} mt={2}>
            {values &&
              values.map((option, optionIndex) => (
                <Box
                  key={optionIndex}
                  borderWidth="1px"
                  borderRadius="md"
                  p={2}
                  boxShadow="sm"
                  bg={"white"}
                >
                  <VStack align="stretch" spacing={1}>
                    <Flex gap={1}>
                      <Field
                        as={Input}
                        name={`${name}[${optionIndex}].text`}
                        placeholder="Opt. text"
                        size="xs"
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        onClick={() => arrayHelpers.remove(optionIndex)}
                        aria-label="Remove option"
                        size="xs"
                        colorScheme="red"
                        alignSelf="flex-end"
                      />
                    </Flex>
                    <Field
                      as={Checkbox}
                      name={`${name}[${optionIndex}].isDisabled`}
                      size="sm"
                    >
                      Disabled
                    </Field>
                  </VStack>
                </Box>
              ))}
          </SimpleGrid>
        )}
      />
    </FormControl>
  );
};

export default FormDropdownOptions;