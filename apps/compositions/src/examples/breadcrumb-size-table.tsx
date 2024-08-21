"use client"

import { For, Span, Stack, useSlotRecipe } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import { PlaygroundTable } from "compositions/lib/playground-table"
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
  type BreadcrumbRootProps,
} from "compositions/ui/breadcrumb"

export const BreadcrumbSizeTable = () => {
  const recipe = useSlotRecipe({ key: "breadcrumb" })
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.size}>{(v) => <td key={v}>{v}</td>}</For>
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
              <For each={recipe.variantMap.size}>
                {(v) => (
                  <td key={v}>
                    <Stack>
                      <DemoBreadcrumb size={v} colorPalette={c} />
                      <DemoBreadcrumb size={v} colorPalette={c} separator="/" />
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

const DemoBreadcrumb = (props: BreadcrumbRootProps) => {
  return (
    <BreadcrumbRoot {...props}>
      <BreadcrumbLink href="#">Docs</BreadcrumbLink>
      <BreadcrumbLink href="#">Components</BreadcrumbLink>
      <BreadcrumbCurrentLink>Props</BreadcrumbCurrentLink>
    </BreadcrumbRoot>
  )
}
