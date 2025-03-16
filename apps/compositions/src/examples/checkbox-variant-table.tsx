"use client"

import { Checkbox, For, Span, Stack, useSlotRecipe } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import { PlaygroundTable } from "compositions/lib/playground-table"

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
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {c}
                </Span>
              </td>
              <For each={recipe.variantMap.variant}>
                {(v) => (
                  <td>
                    <Stack>
                      <DemoCheckbox colorPalette={c} variant={v}>
                        Checkbox
                      </DemoCheckbox>
                      <DemoCheckbox colorPalette={c} variant={v} defaultChecked>
                        Checkbox
                      </DemoCheckbox>
                      <DemoCheckbox
                        colorPalette={c}
                        variant={v}
                        disabled
                        defaultChecked
                      >
                        Checkbox
                      </DemoCheckbox>
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

const DemoCheckbox = (props: Checkbox.RootProps) => {
  return (
    <Checkbox.Root {...props}>
      <Checkbox.HiddenInput />
      <Checkbox.Control />
      <Checkbox.Label>{props.children}</Checkbox.Label>
    </Checkbox.Root>
  )
}
