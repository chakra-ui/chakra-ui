import type { Meta } from "@storybook/react"
import { Box, For, SegmentGroup, useSlotRecipe } from "../src"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Components / Segment Group",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export const Basic = () => {
  return (
    <SegmentGroup.Root defaultValue="react">
      <SegmentGroup.Indicator />
      <SegmentGroup.Item value="react">
        <SegmentGroup.ItemText>React</SegmentGroup.ItemText>
        <SegmentGroup.ItemHiddenInput />
      </SegmentGroup.Item>

      <SegmentGroup.Item value="solid">
        <SegmentGroup.ItemText>Solid.js</SegmentGroup.ItemText>
        <SegmentGroup.ItemHiddenInput />
      </SegmentGroup.Item>

      <SegmentGroup.Item value="vue">
        <SegmentGroup.ItemText>Vue</SegmentGroup.ItemText>
        <SegmentGroup.ItemHiddenInput />
      </SegmentGroup.Item>
    </SegmentGroup.Root>
  )
}

export const Sizes = () => {
  const recipe = useSlotRecipe("segmentGroup")
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
              <td key={v}>
                <SegmentGroup.Root defaultValue="react" size={v}>
                  <SegmentGroup.Indicator />
                  <SegmentGroup.Item value="react">
                    <SegmentGroup.ItemText>React</SegmentGroup.ItemText>
                    <SegmentGroup.ItemHiddenInput />
                  </SegmentGroup.Item>

                  <SegmentGroup.Item value="solid">
                    <SegmentGroup.ItemText>Solid.js</SegmentGroup.ItemText>
                    <SegmentGroup.ItemHiddenInput />
                  </SegmentGroup.Item>

                  <SegmentGroup.Item value="vue">
                    <SegmentGroup.ItemText>Vue</SegmentGroup.ItemText>
                    <SegmentGroup.ItemHiddenInput />
                  </SegmentGroup.Item>
                </SegmentGroup.Root>
              </td>
            )}
          </For>
        </tr>
      </tbody>
    </PlaygroundTable>
  )
}
