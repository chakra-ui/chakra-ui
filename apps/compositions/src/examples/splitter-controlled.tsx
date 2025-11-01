"use client"

import { Splitter } from "@chakra-ui/react"
import { useState } from "react"

export const SplitterControlled = () => {
  const [sizes, setSizes] = useState<number[]>([50, 50])

  return (
    <Splitter.Root
      orientation="horizontal"
      panels={[{ id: "a" }, { id: "b" }]}
      size={sizes}
      onResize={(details) => {
        setSizes(details.size)
      }}
    >
      <Splitter.Panel id="a" h="250px" bg="fg.muted" color="white">
        Panel A: {sizes[0].toFixed(1)}%
      </Splitter.Panel>

      <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />

      <Splitter.Panel id="b" h="250px" bg="fg.muted" color="white">
        Panel B: {sizes[1].toFixed(1)}%
      </Splitter.Panel>
    </Splitter.Root>
  )
}

export default SplitterControlled
