"use client"

import { For, Span, Stack, useSlotRecipe } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import { PlaygroundTable } from "compositions/lib/playground-table"
import { Checkbox } from "compositions/ui/checkbox"

export const CheckboxVariantTable = () => {
  const recipe = useSlotRecipe({ key: "checkbox" })
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.variant}>{(v) => <td>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <For each={colorPalettes}>
          {(c) => (
            <tr>
              <td>
                <Span fontSize="sm" color="fg.subtle" minW="8ch">
                  {c}
                </Span>
              </td>
              <For each={recipe.variantMap.variant}>
                {(v) => (
                  <td>
                    <Stack>
                      <Checkbox colorPalette={c} variant={v}>
                        Checkbox
                      </Checkbox>
                      <Checkbox colorPalette={c} variant={v} defaultChecked>
                        Checkbox
                      </Checkbox>
                      <Checkbox
                        colorPalette={c}
                        variant={v}
                        disabled
                        defaultChecked
                      >
                        Checkbox
                      </Checkbox>
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
