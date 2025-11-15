"use client"

import { Box, Button, Flex, Splitter, useSplitter } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const SplitterWithStore = () => {
  const splitter = useSplitter({
    defaultSize: [50, 50],
    panels: [
      {
        id: "a",
        collapsible: true,
        collapsedSize: 10,
        minSize: 20,
      },
      { id: "b", minSize: 20 },
    ],
    orientation: "horizontal",
  })

  return (
    <Box>
      <Flex gap={3} mb={4} wrap="wrap">
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            splitter.isPanelCollapsed("a")
              ? splitter.expandPanel("a")
              : splitter.collapsePanel("a")
          }
        >
          {splitter.isPanelCollapsed("a")
            ? "Expand Panel A"
            : "Collapse Panel A"}
        </Button>
      </Flex>
      <Splitter.RootProvider value={splitter}>
        <Splitter.Panel id="a">
          <DecorativeBox fontSize="2xl">A</DecorativeBox>
        </Splitter.Panel>

        <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />

        <Splitter.Panel id="b">
          <DecorativeBox fontSize="2xl">B</DecorativeBox>
        </Splitter.Panel>
      </Splitter.RootProvider>
    </Box>
  )
}
