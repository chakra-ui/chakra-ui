"use client"

import { Splitter } from "@chakra-ui/react"

export const SplitterBasic = () => {
  return (
    <Splitter.Root panels={[{ id: "a" }, { id: "b" }]}>
      <Splitter.Panel id="a" h="250px" bg="fg.muted" color="white">
        A
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />
      <Splitter.Panel id="b" h="250px" bg="fg.muted" color="white">
        B
      </Splitter.Panel>
    </Splitter.Root>
  )
}

export default SplitterBasic
