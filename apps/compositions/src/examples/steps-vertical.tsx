import { Button, Group, Stack } from "@chakra-ui/react"
import {
  StepsCompletedContent,
  StepsContent,
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsRoot,
} from "compositions/ui/steps"

export const StepsVertical = () => {
  return (
    <StepsRoot orientation="vertical" height="400px" defaultValue={1} count={3}>
      <StepsList>
        <StepsItem index={0} title="Step 1" />
        <StepsItem index={1} title="Step 2" />
        <StepsItem index={2} title="Step 3" />
      </StepsList>

      <Stack>
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
      </Stack>
    </StepsRoot>
  )
}
