import { Box, HStack } from "../src"
import { Step, Stepper, useSteps } from "../src/components/stepper"

export default {
  title: "Navigation / Stepper",
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
          <Step.Root key={index} onClick={() => setActiveStep(index)}>
            <Step.Indicator>
              <Step.IndicatorContent />
            </Step.Indicator>

            <Box flexShrink="0">
              <Step.Title>{step.title}</Step.Title>
              <Step.Description>{step.description}</Step.Description>
            </Box>

            <Step.Separator />
          </Step.Root>
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
          <Step.Root key={index}>
            <Step.Indicator>
              <Step.IndicatorContent />
            </Step.Indicator>

            <Box flexShrink="0">
              <Step.Title>{step.title}</Step.Title>
              <Step.Description>{step.description}</Step.Description>
            </Box>

            <Step.Separator />
          </Step.Root>
        ))}
      </Stepper>

      <HStack mt="5">
        <button onClick={goToPrevious}>Prev</button>
        <button onClick={goToNext}>Next</button>
      </HStack>
    </>
  )
}
