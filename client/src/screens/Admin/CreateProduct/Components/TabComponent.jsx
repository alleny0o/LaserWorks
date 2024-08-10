import { Tab, Tabs, TabList, TabPanels, TabPanel } from '@chakra-ui/react';

const TabComponent = ({ steps, activeStep, completedSteps, onTabChange, formProps }) => {
  return (
    <Tabs index={activeStep} onChange={onTabChange} variant="soft-rounded" colorScheme="green">
      <TabList>
        {steps.map((step, index) => (
          <Tab
            key={index}
            isDisabled={!completedSteps.includes(index) && index !== activeStep}
          >
            {step.name}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {steps.map((step, index) => (
          <TabPanel key={index}>
            {index === 0 && (
              <step.component 
                files={formProps.values.files}
                thumbnail={formProps.values.thumbnail}
                onFileChange={(newFiles) => formProps.handleFileChange(newFiles, formProps.setFieldValue)}
                onThumbnailChange={(index) => {
                  if (index === formProps.values.thumbnail) {
                    formProps.setFieldValue("thumbnail", null);
                  } else {
                    formProps.setFieldValue("thumbnail", index);
                  }
                }}
                filesError={formProps.touched.files && formProps.errors.files}
                thumbnailError={formProps.touched.thumbnail && formProps.errors.thumbnail}
              />
            )}
            {index === 1 && (
              <step.component 
                values={formProps.values}
                errors={formProps.errors}
                touched={formProps.touched}
                setFieldValue={formProps.setFieldValue}
              />
            )}
            {index === 2 && (
              <step.component 
                values={formProps.values}
                errors={formProps.errors}
                touched={formProps.touched}
                setFieldValue={formProps.setFieldValue}
              />
            )}
          </TabPanel>
        ))}
      </TabPanels>

    </Tabs>
  )
}

export default TabComponent