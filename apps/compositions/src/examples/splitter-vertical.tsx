"use client"

import { Splitter } from "@chakra-ui/react"

export const SplitterVertical = () => {
  return (
    <Splitter.Root panels={[{ id: "a" }, { id: "b" }]} orientation="vertical">
      <Splitter.Panel id="a" w="full" minH="300px" bg="fg.muted" color="white">
        A
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />
      <Splitter.Panel id="b" w="full" minH="300px" bg="fg.muted" color="white">
        B
      </Splitter.Panel>
    </Splitter.Root>
  )
}
