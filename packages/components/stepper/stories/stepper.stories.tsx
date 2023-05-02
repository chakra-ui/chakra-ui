import { Box, HStack } from "@chakra-ui/layout"
import {
  Step,
  StepDescription,
  StepIndicator,
  StepIndicatorContent,
  StepSeparator,
  StepTitle,
  Stepper,
  useSteps,
} from "../src"

export default {
  title: "Components / Navigation / Stepper",
}

const steps = [
  { title: "First", description: "Contact Info" },
  { title: "Second", description: "Date & Time" },
  { title: "Third", description: "Select Rooms" },
]

export const Horizontal = () => {
  const { goToNext, goToPrevious, activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  })

  return (
    <>
      <Stepper index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index} onClick={() => setActiveStep(index)}>
            <StepIndicator>
              <StepIndicatorContent />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <HStack mt="5">
        <button onClick={goToPrevious}>Prev</button>
        <button onClick={goToNext}>Next</button>
      </HStack>
    </>
  )
}

export const Vertical = () => {
  const { goToNext, goToPrevious, activeStep } = useSteps({
    index: 1,
    count: steps.length,
  })

  return (
    <>
      <Stepper index={activeStep} orientation="vertical" height="400px" gap="0">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepIndicatorContent />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <HStack mt="5">
        <button onClick={goToPrevious}>Prev</button>
        <button onClick={goToNext}>Next</button>
      </HStack>
    </>
  )
}
