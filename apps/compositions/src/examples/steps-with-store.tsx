"use client"

import {
  Button,
  Code,
  Group,
  Stack,
  StepsRootProvider,
  useSteps,
} from "@chakra-ui/react"
import {
  StepsCompletedContent,
  StepsContent,
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
} from "compositions/ui/steps"

export const StepsWithStore = () => {
  const steps = useSteps({
    defaultStep: 1,
    count: 3,
  })

  return (
    <Stack align="flex-start">
      <Code>current step: {steps.value}</Code>
      <StepsRootProvider value={steps}>
        <StepsList>
          <StepsItem index={0} title="Step 1" />
          <StepsItem index={1} title="Step 2" />
          <StepsItem index={2} title="Step 3" />
        </StepsList>

        <StepsContent index={0}>Step 1</StepsContent>
        <StepsContent index={1}>Step 2</StepsContent>
        <StepsContent index={2}>Step 3</StepsContent>
        <StepsCompletedContent>All steps are complete!</StepsCompletedContent>

        <Group>
          <StepsPrevTrigger asChild>
            <Button variant="outline" size="sm">
              Prev
            </Button>
          </StepsPrevTrigger>
          <StepsNextTrigger asChild>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </StepsNextTrigger>
        </Group>
      </StepsRootProvider>
    </Stack>
  )
}
