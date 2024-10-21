"use client"

import { For, HStack, Span, useSlotRecipe } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import { PlaygroundTable } from "compositions/lib/playground-table"
import { Radio, RadioGroup } from "compositions/ui/radio"

export const RadioSizeTable = () => {
  const recipe = useSlotRecipe({ key: "radioGroup" })
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
                    <RadioGroup
                      colorPalette={c}
                      size={v}
                      defaultValue="1"
                      minWidth="200px"
                    >
                      <HStack gap="4">
                        <Radio value="1">Radio</Radio>
                        <Radio value="2">Radio</Radio>
                      </HStack>
                    </RadioGroup>
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
