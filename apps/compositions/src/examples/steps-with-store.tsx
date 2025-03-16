"use client"

import {
  Button,
  ButtonGroup,
  Code,
  Stack,
  Steps,
  useSteps,
} from "@chakra-ui/react"

export const StepsWithStore = () => {
  const steps = useSteps({
    defaultStep: 1,
    count: items.length,
  })

  return (
    <Stack align="flex-start">
      <Code>current step: {steps.value}</Code>
      <Steps.RootProvider value={steps}>
        <Steps.List>
          {items.map((step, index) => (
            <Steps.Item key={index} index={index} title={step.title}>
              <Steps.Indicator />
              <Steps.Title>{step.title}</Steps.Title>
              <Steps.Separator />
            </Steps.Item>
          ))}
        </Steps.List>
        {items.map((step, index) => (
          <Steps.Content key={index} index={index}>
            {step.description}
          </Steps.Content>
        ))}
        <Steps.CompletedContent>All steps are complete!</Steps.CompletedContent>

        <ButtonGroup size="sm" variant="outline">
          <Steps.PrevTrigger asChild>
            <Button>Prev</Button>
          </Steps.PrevTrigger>
          <Steps.NextTrigger asChild>
            <Button>Next</Button>
          </Steps.NextTrigger>
        </ButtonGroup>
      </Steps.RootProvider>
    </Stack>
  )
}

const items = [
  {
    title: "Step 1",
    description: "Step 1 description",
  },
  {
    title: "Step 2",
    description: "Step 2 description",
  },
  {
    title: "Step 3",
    description: "Step 3 description",
  },
]
