import { For, Group, Stack } from "@chakra-ui/react"
import { Button } from "compositions/ui/button"
import {
  StepsCompletedContent,
  StepsContent,
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsRoot,
} from "compositions/ui/steps"

export const StepsWithVariants = () => {
  return (
    <Stack gap="16">
      <For each={["subtle", "solid"]}>
        {(variant) => (
          <StepsRoot key={variant} variant={variant} count={3}>
            <StepsList>
              <StepsItem index={0} title="Step 1" />
              <StepsItem index={1} title="Step 2" />
              <StepsItem index={2} title="Step 3" />
            </StepsList>

            <StepsContent index={0}>Step 1</StepsContent>
            <StepsContent index={1}>Step 2</StepsContent>
            <StepsContent index={2}>Step 3</StepsContent>
            <StepsCompletedContent>
              All steps are complete!
            </StepsCompletedContent>

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
        )}
      </For>
    </Stack>
  )
}
