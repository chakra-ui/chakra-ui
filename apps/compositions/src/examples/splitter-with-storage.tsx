"use client"

import { Box, HStack, Splitter, Text } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"
import { LuMouse, LuMoveHorizontal } from "react-icons/lu"
import { useLocalStorage } from "react-use"

export const SplitterWithStorage = () => {
  const [sizes, setSizes] = useLocalStorage("splitter-sizes", [70, 50])

  return (
    <Box>
      <HStack textStyle="sm" mb="4" gap={2}>
        <LuMouse />
        <LuMoveHorizontal />
        <Text>Drag to resize panels</Text>
        <Text color="fg.muted">
          | Panel A: {sizes?.[0].toFixed(1)}% | Panel B: {sizes?.[1].toFixed(1)}
          %
        </Text>
      </HStack>

      <Splitter.Root
        panels={[{ id: "a" }, { id: "b" }]}
        defaultSize={sizes ?? [70, 50]}
        onResize={(event) => setSizes(event.size)}
        minH="60"
      >
        <Splitter.Panel id="a">
          <DecorativeBox fontSize="2xl">A</DecorativeBox>
        </Splitter.Panel>

        <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />

        <Splitter.Panel id="b">
          <DecorativeBox fontSize="2xl">B</DecorativeBox>
        </Splitter.Panel>
      </Splitter.Root>
    </Box>
  )
}
