"use client"

import { Box, Splitter } from "@chakra-ui/react"

export const SplitterVertical = () => {
  return (
    <Splitter.Root
      orientation="vertical"
      size={[
        { id: "top", size: 50 },
        { id: "bottom", size: 50 },
      ]}
    >
      <Splitter.Panel id="top">
        <Box p="4" bg="bg.subtle" height="150px">
          Top Panel
        </Box>
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="top:bottom" />
      <Splitter.Panel id="bottom">
        <Box p="4" bg="bg.muted" height="150px">
          Bottom Panel
        </Box>
      </Splitter.Panel>
    </Splitter.Root>
  )
}
