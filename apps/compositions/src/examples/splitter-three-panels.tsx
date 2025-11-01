"use client"

import { Splitter } from "@chakra-ui/react"

export const SplitterThreePanels = () => {
  return (
    <Splitter.Root panels={[{ id: "a" }, { id: "b" }, { id: "c" }]}>
      <Splitter.Panel id="a" h="250px" bg="fg.muted" color="white">
        A
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />
      <Splitter.Panel id="b" h="250px" bg="fg.muted" color="white">
        B
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="b:c" aria-label="Resize" />
      <Splitter.Panel id="c" h="250px" bg="fg.muted" color="white">
        C
      </Splitter.Panel>
    </Splitter.Root>
  )
}

export default SplitterThreePanels
