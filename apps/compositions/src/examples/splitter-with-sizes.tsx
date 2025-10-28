"use client"

import { Box, Splitter, Stack } from "@chakra-ui/react"

export const SplitterWithSizes = () => {
  return (
    <Stack gap="6">
      <Box>
        <Box mb="2" fontWeight="medium" textStyle="sm">
          Small
        </Box>
        <Splitter.Root
          size="sm"
          size={[
            { id: "a", size: 50 },
            { id: "b", size: 50 },
          ]}
        >
          <Splitter.Panel id="a">
            <Box p="4" bg="bg.subtle" height="120px">
              Panel A
            </Box>
          </Splitter.Panel>
          <Splitter.ResizeTrigger id="a:b" />
          <Splitter.Panel id="b">
            <Box p="4" bg="bg.muted" height="120px">
              Panel B
            </Box>
          </Splitter.Panel>
        </Splitter.Root>
      </Box>

      <Box>
        <Box mb="2" fontWeight="medium" textStyle="sm">
          Medium (Default)
        </Box>
        <Splitter.Root
          size="md"
          size={[
            { id: "c", size: 50 },
            { id: "d", size: 50 },
          ]}
        >
          <Splitter.Panel id="c">
            <Box p="4" bg="bg.subtle" height="120px">
              Panel C
            </Box>
          </Splitter.Panel>
          <Splitter.ResizeTrigger id="c:d" />
          <Splitter.Panel id="d">
            <Box p="4" bg="bg.muted" height="120px">
              Panel D
            </Box>
          </Splitter.Panel>
        </Splitter.Root>
      </Box>

      <Box>
        <Box mb="2" fontWeight="medium" textStyle="sm">
          Large
        </Box>
        <Splitter.Root
          size="lg"
          size={[
            { id: "e", size: 50 },
            { id: "f", size: 50 },
          ]}
        >
          <Splitter.Panel id="e">
            <Box p="4" bg="bg.subtle" height="120px">
              Panel E
            </Box>
          </Splitter.Panel>
          <Splitter.ResizeTrigger id="e:f" />
          <Splitter.Panel id="f">
            <Box p="4" bg="bg.muted" height="120px">
              Panel F
            </Box>
          </Splitter.Panel>
        </Splitter.Root>
      </Box>
    </Stack>
  )
}
