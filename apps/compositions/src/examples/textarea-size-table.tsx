"use client"

import { For, Span, Stack, Textarea, useRecipe } from "@chakra-ui/react"
import { PlaygroundTable } from "compositions/lib/playground-table"

export const TextareaSizeTable = () => {
  const recipe = useRecipe({ key: "textarea" })
  return (
    <PlaygroundTable>
      <tbody>
        <For each={recipe.variantMap.size}>
          {(v) => (
            <tr key={v}>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {v}
                </Span>
              </td>
              <td>
                <Stack minW="320px">
                  <Textarea size={v} placeholder="Placeholder" />
                  <Textarea
                    variant="subtle"
                    size={v}
                    placeholder="Placeholder"
                  />
                </Stack>
              </td>
            </tr>
          )}
        </For>
      </tbody>
    </PlaygroundTable>
  )
}
