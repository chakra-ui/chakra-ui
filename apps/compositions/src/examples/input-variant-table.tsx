"use client"

import { For, Input, Span, useRecipe } from "@chakra-ui/react"
import { PlaygroundTable } from "compositions/lib/playground-table"

export const InputVariantTable = () => {
  const recipe = useRecipe({ key: "input" })
  return (
    <PlaygroundTable>
      <tbody>
        <For each={recipe.variantMap.variant}>
          {(v) => (
            <tr>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {v}
                </Span>
              </td>
              <td>
                <Input variant={v} placeholder="Placeholder" />
              </td>
            </tr>
          )}
        </For>
        <tr>
          <td>
            <Span fontSize="sm" color="fg.muted" minW="8ch">
              unstyled
            </Span>
          </td>
          <td>
            <Input unstyled placeholder="Placeholder" />
          </td>
        </tr>
      </tbody>
    </PlaygroundTable>
  )
}
