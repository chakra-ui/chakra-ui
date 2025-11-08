import { Box, Splitter, Text } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const SplitterCollapsible = () => {
  return (
    <Box>
      <Text textStyle="sm" mb={4}>
        Drag the resizer to collapse or expand Panel A
      </Text>
      <Splitter.Root
        defaultSize={[15, 20]}
        panels={[
          {
            id: "a",
            collapsible: true,
            collapsedSize: 10,
            minSize: 25,
            maxSize: 25,
          },
          { id: "b", minSize: 50 },
        ]}
        orientation="horizontal"
      >
        <Splitter.Panel id="a">
          <DecorativeBox fontSize="2xl" h="250px">
            A
          </DecorativeBox>
        </Splitter.Panel>

        <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />

        <Splitter.Panel id="b">
          <DecorativeBox fontSize="2xl" h="250px">
            B
          </DecorativeBox>
        </Splitter.Panel>
      </Splitter.Root>
    </Box>
  )
}
