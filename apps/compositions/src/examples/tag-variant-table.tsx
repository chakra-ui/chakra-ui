"use client"

import { Avatar, For, Span, Stack, Tag, useSlotRecipe } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import { PlaygroundTable } from "compositions/lib/playground-table"
import { HiCheck, HiOutlineBriefcase } from "react-icons/hi"

export const TagVariantTable = () => {
  const recipe = useSlotRecipe({ key: "tag" })
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
                    <Stack align="flex-start">
                      <Tag.Root variant={v} colorPalette={c}>
                        <Tag.Label>Gray</Tag.Label>
                      </Tag.Root>

                      <Tag.Root variant={v} colorPalette={c}>
                        <Tag.Label>Gray</Tag.Label>
                        <Tag.EndElement>
                          <Tag.CloseTrigger />
                        </Tag.EndElement>
                      </Tag.Root>

                      <Tag.Root variant={v} colorPalette={c}>
                        <Tag.StartElement>
                          <HiCheck />
                        </Tag.StartElement>
                        <Tag.Label>Gray</Tag.Label>
                      </Tag.Root>

                      <Tag.Root variant={v} colorPalette={c}>
                        <Tag.StartElement>
                          <HiOutlineBriefcase />
                        </Tag.StartElement>
                        <Tag.Label>Projects</Tag.Label>
                      </Tag.Root>

                      <Tag.Root
                        variant={v}
                        colorPalette={c}
                        borderRadius="full"
                      >
                        <Tag.StartElement>
                          <Avatar.Root size="full">
                            <Avatar.Image src="https://bit.ly/dan-abramov" />
                            <Avatar.Fallback name="Dan Abramov" />
                          </Avatar.Root>
                        </Tag.StartElement>
                        <Tag.Label>Dan Abramov</Tag.Label>
                      </Tag.Root>
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
