import { ScrollArea } from "@chakra-ui/react"
import LoremIpsum from "react-lorem-ipsum"

export const ScrollAreaBasic = () => (
  <ScrollArea.Root height="8.5rem" maxW="lg">
    <ScrollArea.Viewport>
      <ScrollArea.Content spaceY="4" textStyle="sm">
        <LoremIpsum p={3} />
      </ScrollArea.Content>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar>
      <ScrollArea.Thumb />
    </ScrollArea.Scrollbar>
    <ScrollArea.Corner />
  </ScrollArea.Root>
)
