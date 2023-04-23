import { Box } from "@chakra-ui/layout"
import { Step, StepDescription, StepIcon, StepTitle } from "../src"
import { StepIndicator } from "../src/step-indicator"
import { StepContent } from "../src/step-content"
import { StepNumber } from "../src/step-number"
import { StepSeparator } from "../src/step-separator"
import { Stepper } from "../src/stepper"
import { useSteps } from "../src/use-steps"

export default {
  title: "Components / Navigation / Stepper",
}

const steps = [
  { title: "First Step", description: "Create an account" },
  { title: "Second Step", description: "Verify Email" },
  { title: "Third Step", description: "Get Full Access" },
]

export const Horizontal = () => {
  const { goToNext, goToPrevious, activeStep, setActiveStep } = useSteps({
    index: 1,
  })
  return (
    <>
      <button onClick={() => goToPrevious()}>Prev</button>
      <button onClick={() => goToNext(3)}>Next</button>

      <Stepper index={activeStep} size="md">
        {steps.map((step, index) => (
          <Step key={index} onClick={() => setActiveStep(index)}>
            <StepIndicator>
              <StepContent
                when={{
                  complete: <StepIcon />,
                  incomplete: <StepNumber />,
                  active: <StepNumber />,
                }}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </>
  )
}

export const Vertical = () => {
  const { goToNext, goToPrevious, activeStep } = useSteps({ index: 1 })
  return (
    <>
      <Stepper index={activeStep} orientation="vertical" height="400px" gap="0">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepContent
                when={{
                  complete: <StepIcon />,
                  incomplete: <StepNumber />,
                  active: <StepNumber />,
                }}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <button onClick={() => goToPrevious()}>Prev</button>
      <button onClick={() => goToNext(3)}>Next</button>
    </>
  )
}
