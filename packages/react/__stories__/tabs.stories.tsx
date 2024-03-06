import { useInterval } from "@chakra-ui/hooks"
import { useState } from "react"
import { Box, For, Span, Tabs, Text } from "../src"
import { useSlotRecipe } from "../src/styled-system"
import { colorPalettes } from "./shared/color-palettes"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Disclosure / Tabs",
  decorators: [
    (story: Function) => (
      <Box mx="auto" padding="40px">
        {story()}
      </Box>
    ),
  ],
}

export const Variants = () => {
  const recipe = useSlotRecipe("Tabs")
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

export const Sizes = () => {
  const recipe = useSlotRecipe("Tabs")
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.size}>{(v) => <td>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <For each={recipe.variantMap.variant}>
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
                    <Tabs.Root
                      defaultValue="settings"
                      size={v}
                      variant={c}
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

export const withIndicator = () => (
  <Tabs.Root defaultValue="settings" variant="plain" isManual>
    <Tabs.List>
      <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      <Tabs.Trigger value="billing" isDisabled>
        Billing
      </Tabs.Trigger>
      <Tabs.Trigger value="preferences">Preferences</Tabs.Trigger>
      <Tabs.Trigger value="shutdown">Shut Down</Tabs.Trigger>
      <Tabs.Indicator zIndex={-1} height="34px" bg="bg.muted" />
    </Tabs.List>

    <Tabs.ContentGroup paddingY="4" fontSize="sm">
      <Tabs.Content value="settings">Settings</Tabs.Content>
      <Tabs.Content value="billing">Billing</Tabs.Content>
      <Tabs.Content value="preferences">Preferences</Tabs.Content>
      <Tabs.Content value="shutdown">Shut Down</Tabs.Content>
    </Tabs.ContentGroup>
  </Tabs.Root>
)

export const withVerticalTabs = () => (
  <Tabs.Root defaultValue="settings" orientation="vertical">
    <Tabs.List>
      <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
      <Tabs.Trigger value="preferences" isDisabled>
        Preferences
      </Tabs.Trigger>
      <Tabs.Trigger value="shutdown">Shut Down</Tabs.Trigger>
    </Tabs.List>
    <Tabs.ContentGroup paddingX="4">
      <Tabs.Content value="settings">Settings</Tabs.Content>
      <Tabs.Content value="billing">Billing</Tabs.Content>
      <Tabs.Content value="preferences">Preferences</Tabs.Content>
      <Tabs.Content value="shutdown">Shut Down</Tabs.Content>
    </Tabs.ContentGroup>
  </Tabs.Root>
)

const Interval = () => {
  const [value, setValue] = useState(0)
  useInterval(() => setValue((v) => v + 1), 1000)
  return (
    <span style={{ fontWeight: "bold", color: "tomato", padding: 4 }}>
      {value}
    </span>
  )
}

export const withLazyTabs = () => (
  <Tabs.Root defaultValue="1" isLazy>
    <Tabs.List>
      <Tabs.Trigger value="1">Interval 1</Tabs.Trigger>
      <Tabs.Trigger value="2">Interval 2</Tabs.Trigger>
    </Tabs.List>
    <Tabs.ContentGroup paddingY="4">
      <Tabs.Content value="1">
        Interval 1:
        <Interval />
      </Tabs.Content>
      <Tabs.Content value="2">
        Interval 2:
        <Interval />
      </Tabs.Content>
    </Tabs.ContentGroup>
  </Tabs.Root>
)
