"use client"

import { Card, For, Heading, Text, useSlotRecipe } from "@chakra-ui/react"
import { PlaygroundTable } from "compositions/lib/playground-table"
import { Button } from "compositions/ui/button"

export const CardVariantTable = () => {
  const recipe = useSlotRecipe({ key: "card" })
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <For each={recipe.variantMap.variant}>
            {(v) => <td key={v}>{v}</td>}
          </For>
        </tr>
      </thead>
      <tbody>
        <For each={recipe.variantMap.variant}>
          {(v) => (
            <td key={v}>
              <Card.Root variant={v}>
                <Card.Header>
                  <Heading size="md"> Card Title</Heading>
                </Card.Header>
                <Card.Body>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
      </tbody>
    </PlaygroundTable>
  )
}
