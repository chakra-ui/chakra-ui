"use client"

import { Splitter } from "@chakra-ui/react"

export const SplitterVertical = () => {
  return (
    <Splitter.Root
      panels={[{ id: "a" }, { id: "b" }]}
      orientation="vertical"
      height="600px"
    >
      <Splitter.Panel id="a" bg="fg.muted" color="white" w="full">
        A
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />
      <Splitter.Panel id="b" bg="fg.muted" color="white" w="full">
        B
      </Splitter.Panel>
    </Splitter.Root>
  )
}

export default SplitterVertical
