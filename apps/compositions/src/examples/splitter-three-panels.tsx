"use client"

import { Box, Splitter } from "@chakra-ui/react"

export const SplitterThreePanels = () => {
  return (
    <Splitter.Root
      size={[
        { id: "left", size: 33.33 },
        { id: "center", size: 33.33 },
        { id: "right", size: 33.33 },
      ]}
    >
      <Splitter.Panel id="left">
        <Box p="4" bg="blue.subtle" height="200px">
          Left Panel
        </Box>
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="left:center" />
      <Splitter.Panel id="center">
        <Box p="4" bg="green.subtle" height="200px">
          Center Panel
        </Box>
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="center:right" />
      <Splitter.Panel id="right">
        <Box p="4" bg="purple.subtle" height="200px">
          Right Panel
        </Box>
      </Splitter.Panel>
    </Splitter.Root>
  )
}
