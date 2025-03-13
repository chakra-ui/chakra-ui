import { Box, Button, ButtonGroup, Steps } from "@chakra-ui/react"

export const StepsWithDescription = () => {
  return (
    <Steps.Root defaultStep={1} count={steps.length}>
      <Steps.List>
        {steps.map((step, index) => (
          <Steps.Item key={index} index={index} title={step.title}>
            <Steps.Indicator />
            <Box>
              <Steps.Title>{step.title}</Steps.Title>
              <Steps.Description>{step.description}</Steps.Description>
            </Box>
            <Steps.Separator />
          </Steps.Item>
        ))}
      </Steps.List>

      {steps.map((step, index) => (
        <Steps.Content key={index} index={index}>
          {step.content}
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
    </Steps.Root>
  )
}

const steps = [
  {
    title: "Step 1",
    content: "Step 1 content",
    description: "This step",
  },
  {
    title: "Step 2",
    content: "Step 2 content",
    description: "That step",
  },
  {
    title: "Step 3",
    content: "Step 3 content",
    description: "Final step",
  },
]
