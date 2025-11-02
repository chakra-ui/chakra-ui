"use client"

import { Button, Flex, Splitter, useSplitter } from "@chakra-ui/react"

export const SplitterWithStore = () => {
  const splitter = useSplitter({
    defaultSize: [50, 50],
    panels: [{ id: "a" }, { id: "b" }],
    orientation: "horizontal",
  })

  const maximizeA = () => splitter.setSizes([100, 0])
  const resetSizes = () => splitter.setSizes([50, 50])

  return (
    <>
      <Flex gap={5} mb={2} w="full" justify="space-between">
        <Button variant="outline" onClick={maximizeA}>
          Maximize A
        </Button>
        <Button variant="outline" onClick={resetSizes}>
          Reset
        </Button>
      </Flex>

      <Splitter.RootProvider value={splitter} mt={10}>
        <Splitter.Panel id="a" bg="fg.muted" color="white" h="250px" p={4}>
          Panel A
        </Splitter.Panel>
        <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
        <Splitter.Panel id="b" bg="fg.muted" color="white" h="250px" p={4}>
          Panel B
        </Splitter.Panel>
      </Splitter.RootProvider>
    </>
  )
}

export default SplitterWithStore
