import { Button, For, Group, Stack } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import {
  StepsCompletedContent,
  StepsContent,
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsRoot,
} from "compositions/ui/steps"

export const StepsWithColors = () => {
  return (
    <Stack gap="10" width="full">
      <For each={colorPalettes}>
        {(colorPalette) => (
          <StepsRoot
            key={colorPalette}
            defaultValue={1}
            count={3}
            colorPalette={colorPalette}
          >
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
