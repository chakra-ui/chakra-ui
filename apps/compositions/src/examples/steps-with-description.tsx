import { Group } from "@chakra-ui/react"
import { Button } from "compositions/ui/button"
import {
  StepsCompleteContent,
  StepsContent,
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsRoot,
} from "compositions/ui/steps"

export const StepsWithDescription = () => {
  return (
    <StepsRoot skippable={false} defaultValue={1} count={3}>
      <StepsList>
        <StepsItem index={0} title="Step 1" description="This step" />
        <StepsItem index={1} title="Step 2" description="That step" />
        <StepsItem index={2} title="Step 3" description="Final step" />
      </StepsList>

      <StepsContent index={0}>Step 1</StepsContent>
      <StepsContent index={1}>Step 2</StepsContent>
      <StepsContent index={2}>Step 3</StepsContent>
      <StepsCompleteContent>All steps are complete!</StepsCompleteContent>

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
    </StepsRoot>
  )
}
