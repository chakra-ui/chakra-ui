"use client"

import { For, Stack, useSlotRecipe } from "@chakra-ui/react"
import { PlaygroundTable } from "compositions/lib/playground-table"
import {
  CheckboxCard,
  type CheckboxCardProps,
} from "compositions/ui/checkbox-card"

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

const DemoCheckboxCard = (props: CheckboxCardProps) => {
  return (
    <CheckboxCard
      label="Next.js"
      description="Best for apps"
      maxW="240px"
      {...props}
    />
  )
}
