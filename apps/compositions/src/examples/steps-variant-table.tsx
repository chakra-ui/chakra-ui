"use client"

import {
  For,
  Group,
  Span,
  type StepsRootProps,
  useSlotRecipe,
} from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import { PlaygroundTable } from "compositions/lib/playground-table"
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

export const StepsVariantTable = () => {
  const recipe = useSlotRecipe("steps")
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.variant}>
            {(v) => <td key={v}>{v}</td>}
          </For>
        </tr>
      </thead>
      <tbody>
        <For each={colorPalettes}>
          {(c) => (
            <tr key={c}>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {c}
                </Span>
              </td>
              <For each={recipe.variantMap.variant}>
                {(v) => (
                  <td key={v}>
                    <DemoSteps
                      variant={v}
                      colorPalette={c}
                      minW="600px"
                      defaultValue={1}
                      count={3}
                    />
                  </td>
                )}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </PlaygroundTable>
  )
}

const DemoSteps = (props: StepsRootProps) => {
  return (
    <StepsRoot {...props} skippable={false}>
      <StepsList>
        <StepsItem index={0} title="Step 1" />
        <StepsItem index={1} title="Step 2" />
        <StepsItem index={2} title="Step 3" />
      </StepsList>

      <StepsContent index={0}>Step 1</StepsContent>
      <StepsContent index={1}>Step 2</StepsContent>
      <StepsContent index={2}>Step 3</StepsContent>
      <StepsCompleteContent>All steps are complete!</StepsCompleteContent>

      <Group>
        <StepsPrevTrigger>
          <Button variant="outline" size="sm">
            Prev
          </Button>
        </StepsPrevTrigger>
        <StepsNextTrigger>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </StepsNextTrigger>
      </Group>
    </StepsRoot>
  )
}
