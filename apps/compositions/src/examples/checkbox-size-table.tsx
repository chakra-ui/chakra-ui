"use client"

import { Checkbox, For, Span, Stack, useSlotRecipe } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import { PlaygroundTable } from "compositions/lib/playground-table"

export const CheckboxSizeTable = () => {
  const recipe = useSlotRecipe({ key: "checkbox" })
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.size}>{(v) => <td>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <For each={colorPalettes}>
          {(c) => (
            <tr>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {c}
                </Span>
              </td>
              <For each={recipe.variantMap.size}>
                {(v) => (
                  <td>
                    <Stack>
                      <Checkbox.Root colorPalette={c} size={v}>
                        <Checkbox.HiddenInput />
                        <Checkbox.Indicator />
                        <Checkbox.Label>Checkbox</Checkbox.Label>
                      </Checkbox.Root>
                      <Checkbox.Root colorPalette={c} size={v} defaultChecked>
                        <Checkbox.HiddenInput />
                        <Checkbox.Indicator />
                        <Checkbox.Label>Checkbox</Checkbox.Label>
                      </Checkbox.Root>
                    </Stack>
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
