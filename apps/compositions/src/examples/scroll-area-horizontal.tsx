import { Flex, ScrollArea } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const ScrollAreaHorizontal = () => (
  <ScrollArea.Root width="24rem" size="xs">
    <ScrollArea.Viewport>
      <ScrollArea.Content py="4">
        <Flex gap="4" flexWrap="nowrap">
          {Array.from({ length: 12 }, (_, i) => (
            <DecorativeBox rounded="sm" key={i} h="20" w="40" flexShrink="0">
              Item {i + 1}
            </DecorativeBox>
          ))}
        </Flex>
      </ScrollArea.Content>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar orientation="horizontal" />
    <ScrollArea.Corner />
  </ScrollArea.Root>
)
