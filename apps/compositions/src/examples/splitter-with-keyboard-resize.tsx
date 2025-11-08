import { Box, HStack, Splitter, Text } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"
import {
  LuArrowDown,
  LuArrowLeft,
  LuArrowRight,
  LuArrowUp,
} from "react-icons/lu"

export const SplitterWithKeyboardResize = () => {
  return (
    <Box>
      <HStack textStyle="sm" mb={4} gap={2} wrap="wrap">
        <Text>Use keyboard to resize panels:</Text>
        <LuArrowLeft />
        <LuArrowRight />
        <LuArrowUp />
        <LuArrowDown />
        <Text>: Shift for bigger steps, Home/End to jump to min/max</Text>
      </HStack>

      <Splitter.Root panels={[{ id: "a" }, { id: "b" }]} keyboardResizeBy={5}>
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
