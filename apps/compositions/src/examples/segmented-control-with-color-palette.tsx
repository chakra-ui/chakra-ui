import { Center, For, SegmentGroup } from "@chakra-ui/react"

export const SegmentedControlWithColorPalette = () => {
  return (
    <Center minH="dvh">
      <SegmentGroup.Root
        bg="colorPalette.50"
        colorPalette="orange"
        defaultValue="Monthly"
      >
        <SegmentGroup.Indicator />
        <For each={["Monthly", "Yearly"]}>
          {(item) => (
            <SegmentGroup.Item key={item} value={item}>
              <SegmentGroup.ItemText
                _checked={{ color: "colorPalette.fg", fontWeight: "medium" }}
              >
                {item}
              </SegmentGroup.ItemText>
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
          )}
        </For>
      </SegmentGroup.Root>
    </Center>
  )
}
