"use client"

import { Card, For, Heading, Span, Text, useSlotRecipe } from "@chakra-ui/react"
import { PlaygroundTable } from "compositions/lib/playground-table"
import { Button } from "compositions/ui/button"

export const CardSizeTable = () => {
  const recipe = useSlotRecipe({ key: "card" })
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.size}>{(v) => <td key={v}>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <For each={recipe.variantMap.variant}>
          {(v) => (
            <tr key={v}>
              <td>
                <Span fontSize="sm" color="fg.subtle" minW="8ch">
                  {v}
                </Span>
              </td>
              <For each={recipe.variantMap.size}>
                {(s) => (
                  <td key={s}>
                    <Card.Root size={s} variant={v}>
                      <Card.Header>
                        <Heading size={s} fontWeight="semibold">
                          Card Title
                        </Heading>
                      </Card.Header>
                      <Card.Body>
                        <Text>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.
                        </Text>
                      </Card.Body>
                      <Card.Footer>
                        <Button variant="solid" colorPalette="blue">
                          Button
                        </Button>
                      </Card.Footer>
                    </Card.Root>
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
