"use client"

import { Box, HStack, Splitter, Text } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"
import { useState } from "react"
import { LuMouse, LuMoveHorizontal } from "react-icons/lu"

export const SplitterControlled = () => {
  const [sizes, setSizes] = useState([50, 50])

  return (
    <Box>
      <HStack textStyle="sm" mb="4" gap={2}>
        <LuMouse />
        <LuMoveHorizontal />
        <Text>Drag to resize panels</Text>
        <Text color="fg.muted">
          | Panel A: {sizes[0].toFixed(1)}% | Panel B: {sizes[1].toFixed(1)}%
        </Text>
      </HStack>

      <Splitter.Root
        orientation="horizontal"
        panels={[{ id: "a" }, { id: "b" }]}
        size={sizes}
        onResize={(details) => setSizes(details.size)}
      >
        <Splitter.Panel id="a">
          <DecorativeBox fontSize="2xl" h="250px">
            A
          </DecorativeBox>
        </Splitter.Panel>

        <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />

        <Splitter.Panel id="b">
          <DecorativeBox fontSize="2xl" h="250px">
            B
          </DecorativeBox>
        </Splitter.Panel>
      </Splitter.Root>
    </Box>
  )
}
