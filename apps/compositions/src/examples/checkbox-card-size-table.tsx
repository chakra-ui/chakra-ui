"use client"

import { CheckboxCard, For, Stack, useSlotRecipe } from "@chakra-ui/react"
import { PlaygroundTable } from "compositions/lib/playground-table"

export const CheckboxCardSizeTable = () => {
  const recipe = useSlotRecipe({ key: "checkboxCard" })
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.size}>{(v) => <td key={v}>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td />
          <For each={recipe.variantMap.size}>
            {(v) => (
              <td key={v}>
                <Stack gap="4">
                  <DemoCheckboxCard size={v} variant="outline" defaultChecked />
                  <DemoCheckboxCard size={v} variant="subtle" defaultChecked />
                </Stack>
              </td>
            )}
          </For>
        </tr>
      </tbody>
    </PlaygroundTable>
  )
}

const DemoCheckboxCard = (props: CheckboxCard.RootProps) => {
  return (
    <CheckboxCard.Root maxW="240px" {...props}>
      <CheckboxCard.HiddenInput />
      <CheckboxCard.Control>
        <CheckboxCard.Content>
          <CheckboxCard.Label>Next.js</CheckboxCard.Label>
          <CheckboxCard.Description>Best for apps</CheckboxCard.Description>
        </CheckboxCard.Content>
        <CheckboxCard.Indicator />
      </CheckboxCard.Control>
    </CheckboxCard.Root>
  )
}
