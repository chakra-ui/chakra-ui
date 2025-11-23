import { Box, Center, HStack, Splitter } from "@chakra-ui/react"
import { LuMouse, LuMoveHorizontal } from "react-icons/lu"

export const SplitterCollapsible = () => {
  return (
    <Box>
      <HStack textStyle="sm" mb={4}>
        <LuMouse />
        <LuMoveHorizontal />
        Drag the resizer to collapse or expand Panel A
      </HStack>

      <Splitter.Root
        defaultSize={[40, 60]}
        panels={[
          { id: "a", collapsible: true, collapsedSize: 5, minSize: 25 },
          { id: "b", minSize: 50 },
        ]}
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
    </Box>
  )
}
