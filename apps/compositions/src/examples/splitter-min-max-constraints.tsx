"use client"

import { Center, Code, HStack, Span, Splitter, Stack } from "@chakra-ui/react"
import { useState } from "react"
import { LuMouse, LuMoveHorizontal } from "react-icons/lu"

export const SplitterMinMaxConstraints = () => {
  const [sizes, setSizes] = useState([30, 70])

  return (
    <Stack gap="4" align="start">
      <HStack textStyle="sm" gap={2}>
        <LuMouse />
        <LuMoveHorizontal />
        <Span>Drag to resize - Panel A: 20-60%, Panel B: min 40%</Span>
      </HStack>

      <Splitter.Root
        panels={[
          { id: "a", minSize: 20, maxSize: 60 },
          { id: "b", minSize: 40 },
        ]}
        defaultSize={[30, 70]}
        borderWidth="1px"
        size={sizes}
        onResize={(details) => setSizes(details.size)}
        minH="60"
      >
        <Splitter.Panel id="a">
          <Stack boxSize="full" align="center" justify="center" gap="2">
            <Center textStyle="2xl">A</Center>
            <Code size="sm" color="fg.muted">
              {sizes[0].toFixed(1)}% (min: 20%, max: 60%)
            </Code>
          </Stack>
        </Splitter.Panel>

        <Splitter.ResizeTrigger id="a:b" />

        <Splitter.Panel id="b">
          <Stack boxSize="full" align="center" justify="center" gap="2">
            <Center textStyle="2xl">B</Center>
            <Code size="sm" color="fg.muted">
              {sizes[1].toFixed(1)}% (min: 40%)
            </Code>
          </Stack>
        </Splitter.Panel>
      </Splitter.Root>
    </Stack>
  )
}
