"use client"

import { Badge, For, useSlotRecipe } from "@chakra-ui/react"
import { PlaygroundTable } from "compositions/lib/playground-table"
import { DataListItem, DataListRoot } from "compositions/ui/data-list"

export const DataListSizeTable = () => {
  const recipe = useSlotRecipe({ key: "dataList" })
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.size}>{(v) => <td>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td />
          <For each={recipe.variantMap.size}>
            {(v) => (
              <td>
                <DataListRoot size={v}>
                  <DataListItem label="Name" value="John Doe" />
                  <DataListItem label="Email" value="john@test.com" />
                  <DataListItem
                    label="Status"
                    value={<Badge colorPalette="teal">Active</Badge>}
                  />
                </DataListRoot>
              </td>
            )}
          </For>
        </tr>
      </tbody>
    </PlaygroundTable>
  )
}
