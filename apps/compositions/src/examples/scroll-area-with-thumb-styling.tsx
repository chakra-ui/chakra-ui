import { ScrollArea } from "@chakra-ui/react"
import LoremIpsum from "react-lorem-ipsum"

export const ScrollAreaWithThumbStyling = () => (
  <ScrollArea.Root height="8rem" maxW="2xl" variant="always">
    <ScrollArea.Viewport>
      <ScrollArea.Content spaceY="4" pe="2">
        <LoremIpsum p={2} />
      </ScrollArea.Content>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar bg="red.subtle">
      <ScrollArea.Thumb bg="red.solid" />
    </ScrollArea.Scrollbar>
  </ScrollArea.Root>
)
