"use client"

import { For, HStack, RadioGroup, Span, useSlotRecipe } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import { PlaygroundTable } from "compositions/lib/playground-table"

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
                    <RadioGroup.Root
                      colorPalette={c}
                      size={v}
                      defaultValue="1"
                      minWidth="200px"
                    >
                      <HStack gap="4">
                        <DemoRadio value="1">Radio</DemoRadio>
                        <DemoRadio value="2">Radio</DemoRadio>
                      </HStack>
                    </RadioGroup.Root>
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

const DemoRadio = (props: RadioGroup.ItemProps) => {
  return (
    <RadioGroup.Item {...props}>
      <RadioGroup.ItemHiddenInput />
      <RadioGroup.ItemIndicator />
      <RadioGroup.ItemText>{props.children}</RadioGroup.ItemText>
    </RadioGroup.Item>
  )
}
