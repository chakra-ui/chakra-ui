"use client"

import {
  Badge,
  Button,
  Center,
  HStack,
  Span,
  Splitter,
  Stack,
} from "@chakra-ui/react"
import { LuBox, LuMouse, LuMoveHorizontal, LuTrash2 } from "react-icons/lu"
import { useLocalStorage } from "react-use"

export const SplitterWithStorage = () => {
  const [sizes, setSizes] = useLocalStorage("splitter-sizes", [70, 50])
  const formattedSizes = sizes?.map((size) => size.toFixed(1)).join(", ")
  const hasSavedState = sizes && sizes.length > 0

  const clearStorage = () => {
    setSizes(undefined)
  }

  return (
    <Stack gap="4" align="start">
      <HStack textStyle="sm" alignSelf="stretch" justify="space-between">
        <HStack>
          <LuMouse />
          <LuMoveHorizontal />
          <Span>Drag to resize panels</Span>
        </HStack>
        {hasSavedState && (
          <Button size="xs" variant="ghost" onClick={clearStorage}>
            <LuTrash2 /> Clear Storage
          </Button>
        )}
      </HStack>

      <Splitter.Root
        panels={[{ id: "a" }, { id: "b" }]}
        defaultSize={sizes}
        onResizeEnd={(e) => setSizes(e.size)}
        borderWidth="1px"
        minH="60"
      >
        <Splitter.Panel id="a">
          <Center boxSize="full" textStyle="2xl">
            A
          </Center>
        </Splitter.Panel>

        <Splitter.ResizeTrigger id="a:b" />

        <Splitter.Panel id="b">
          <Center boxSize="full" textStyle="2xl">
            B
          </Center>
        </Splitter.Panel>
      </Splitter.Root>

      <Badge>
        <LuBox /> LocalStorage{" "}
        {hasSavedState ? `[${formattedSizes}]` : "[Not saved]"}
      </Badge>
    </Stack>
  )
}
