import { ScrollArea } from "@chakra-ui/react"
import LoremIpsum from "react-lorem-ipsum"

export const ScrollAreaBothDirections = () => (
  <ScrollArea.Root height="12rem" width="lg" size="xs" p="2">
    <ScrollArea.Viewport>
      <ScrollArea.Content spaceY="4" w="40rem" textStyle="sm">
        <LoremIpsum p={3} />
      </ScrollArea.Content>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar orientation="horizontal" />
    <ScrollArea.Scrollbar orientation="vertical" />
    <ScrollArea.Corner bg="bg" />
  </ScrollArea.Root>
)
