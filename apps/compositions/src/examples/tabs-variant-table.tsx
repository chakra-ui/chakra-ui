"use client"

import { For, Span, Tabs, Text, useSlotRecipe } from "@chakra-ui/react"
import { colorPalettes } from "compositions/lib/color-palettes"
import { PlaygroundTable } from "compositions/lib/playground-table"

export const TabsVariantTable = () => {
  const recipe = useSlotRecipe({ key: "tabs" })
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
                <Span fontSize="sm" color="fg.subtlee" minW="8ch">
                  {c}
                </Span>
              </td>
              <For each={recipe.variantMap.variant}>
                {(v) => (
                  <td key={v}>
                    <Tabs.Root
                      defaultValue="settings"
                      variant={v}
                      colorPalette={c}
                      mt="3"
                      minW="300px"
                    >
                      <Tabs.List>
                        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
                        <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
                      </Tabs.List>
                      <Tabs.ContentGroup>
                        <Tabs.Content value="settings" padding="2">
                          <Text fontSize="sm">
                            Settings - Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit.
                          </Text>
                        </Tabs.Content>
                        <Tabs.Content value="billing" padding="2">
                          <Text fontSize="sm">
                            Billing - Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit.
                          </Text>
                        </Tabs.Content>
                      </Tabs.ContentGroup>
                    </Tabs.Root>
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
