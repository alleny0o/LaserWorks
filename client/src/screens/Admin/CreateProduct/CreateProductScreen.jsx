import { useState } from "react";
import { Box, Container, Button, Flex } from "@chakra-ui/react";
import { Formik, Form } from "formik";

// utils
import { steps } from "./utilities/steps";
import { initialValues } from "./utilities/initialValues";

// components
import TabComponent from "./Components/TabComponent";

const CreateProductScreen = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const handleFileChange = (newFiles, setFieldValue) => {
    setFieldValue("files", newFiles);
    if (newFiles.length === 0) {
      setFieldValue("thumbnail", null);
    }
  };

  const handleStepChange = async (index, values, setFieldTouched) => {
    const currentStepSchema = steps[activeStep].validationSchema;
    const isValid = await validateStep(values, currentStepSchema);

    if (isValid) {
      setActiveStep(index);
      if (!completedSteps.includes(activeStep)) {
        setCompletedSteps([...completedSteps, activeStep]);
      }
    } else {
      Object.keys(currentStepSchema.fields).forEach((field) => {
        setFieldTouched(field, true);
      });
    }
  };

  const validateStep = async (values, schema) => {
    try {
      await schema.validate(values, { abortEarly: false });
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = (values, { setSubmitting }) => {};

  return (
    <Box width="100%" minHeight="100vh" bg='#ebebeb' pt={14} pb={12}>
      <Container
        w="85%"
        maxW="4xl"
        minHeight="500px"
        bg="white"
        p={4}
        my={3}
        boxShadow="md"
        borderRadius="md"
        display="flex"
        flexDirection="column"
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={steps[activeStep].validationSchema}
        >
          {({
            values,
            isSubmitting,
            setFieldTouched,
            setFieldValue,
            errors,
            touched,
          }) => (
            <Form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <Box flexGrow={1}>
                <TabComponent
                  steps={steps}
                  activeStep={activeStep}
                  completedSteps={completedSteps}
                  onTabChange={(index) =>
                    handleStepChange(index, values, setFieldTouched)
                  }
                  formProps={{
                    values,
                    errors,
                    touched,
                    setFieldValue,
                    handleFileChange,
                  }}
                />
              </Box>

              <Flex justify="flex-end" mt={4}>
                {activeStep > 0 && (
                  <Button
                    isDisabled={activeStep === 0}
                    onClick={() => setActiveStep(activeStep - 1)}
                    mr={4}
                  >
                    Back
                  </Button>
                )}
                {activeStep < steps.length - 1 ? (
                  <Button
                    onClick={() =>
                      handleStepChange(activeStep + 1, values, setFieldTouched)
                    }
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit" isLoading={isSubmitting}>Submit</Button>
                )}
              </Flex>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default CreateProductScreen;