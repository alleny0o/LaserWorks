import React from "react";
import {
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { FieldArray, Field } from "formik";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

const FormSubdetails = ({ name, values }) => {
  return (
    <FormControl>
      <HStack justify="space-between" align="center" mb={2}>
        <FormLabel fontSize="sm" mb={0}>Sub Details</FormLabel>
        <FieldArray
          name={name}
          render={(arrayHelpers) => (
            <Button
              onClick={() => arrayHelpers.push({ text: "" })}
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
          <VStack align="stretch" spacing={1}>
            {values &&
              values.map((detail, detailIndex) => (
                <HStack key={detailIndex}>
                  <Field
                    as={Input}
                    name={`${name}[${detailIndex}].text`}
                    placeholder={`Enter sub detail ${detailIndex + 1}`}
                    size="xs"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    onClick={() => arrayHelpers.remove(detailIndex)}
                    aria-label="Remove detail"
                    colorScheme="red"
                    size="xs"
                  />
                </HStack>
              ))}
          </VStack>
        )}
      />
    </FormControl>
  );
};

export default FormSubdetails;