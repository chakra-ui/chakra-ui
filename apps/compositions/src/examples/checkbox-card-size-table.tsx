"use client"

import {
  type CheckboxCardRootProps,
  For,
  Stack,
  Text,
  useSlotRecipe,
} from "@chakra-ui/react"
import { PlaygroundTable } from "compositions/lib/playground-table"
import {
  CheckboxCardControl,
  CheckboxCardLabel,
  CheckboxCardRoot,
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
                  <DemoCheckboxCard size={v} variant="plain" defaultChecked />
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

const DemoCheckboxCard = (props: CheckboxCardRootProps) => {
  return (
    <CheckboxCardRoot maxW="240px" {...props}>
      <CheckboxCardControl>
        <Stack gap="0" flex="1">
          <CheckboxCardLabel>Next.js</CheckboxCardLabel>
          <Text color="fg.subtle">Best for apps</Text>
        </Stack>
      </CheckboxCardControl>
    </CheckboxCardRoot>
  )
}
