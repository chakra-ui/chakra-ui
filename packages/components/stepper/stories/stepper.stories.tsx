import { Box, Divider } from "@chakra-ui/layout"
import { Step, StepDescription, StepIcon, StepTitle } from "../src"
import { StepContent, StepIndicator } from "../src/step-indicator"
import { StepNumber } from "../src/step-number"
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

            <StepContent>
              {({ isLast, orientation, status }) =>
                !isLast && (
                  <Divider
                    borderColor={status === "complete" ? "red" : undefined}
                    borderWidth="1.25px"
                    orientation={orientation}
                    position="relative"
                    marginStart="2"
                    flex="1"
                  />
                )
              }
            </StepContent>
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

            <StepContent>
              {({ isLast, orientation, status }) =>
                !isLast && (
                  <Divider
                    orientation={orientation}
                    borderColor={status === "complete" ? "red" : undefined}
                    borderWidth="1.25px"
                    position="absolute"
                    maxHeight="calc(100% - var(--stepper-indicator-size) - 8px)"
                    top="calc(var(--stepper-indicator-size) + 3px)"
                    left="calc(var(--stepper-indicator-size) / 2 - 1px)"
                    flex="1"
                  />
                )
              }
            </StepContent>
          </Step>
        ))}
      </Stepper>

      <button onClick={() => goToPrevious()}>Prev</button>
      <button onClick={() => goToNext(3)}>Next</button>
    </>
  )
}
