"use client"

import { Box, Splitter } from "@chakra-ui/react"

export const SplitterBasic = () => {
  return (
    <Splitter.Root
      size={[
        { id: "a", size: 50 },
        { id: "b", size: 50 },
      ]}
    >
      <Splitter.Panel id="a">
        <Box p="4" bg="bg.subtle" height="200px">
          Panel A
        </Box>
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" />
      <Splitter.Panel id="b">
        <Box p="4" bg="bg.muted" height="200px">
          Panel B
        </Box>
      </Splitter.Panel>
    </Splitter.Root>
  )
}
