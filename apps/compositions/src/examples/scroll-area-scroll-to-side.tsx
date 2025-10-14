"use client"

import {
  Button,
  ButtonGroup,
  ScrollArea,
  Stack,
  useScrollArea,
} from "@chakra-ui/react"
import LoremIpsum from "react-lorem-ipsum"

export const ScrollAreaScrollToSide = () => {
  const scrollArea = useScrollArea()
  return (
    <Stack gap="8" align="flex-start" maxW="xl">
      <ButtonGroup variant="outline" justify="center" size="sm">
        <Button
          onClick={() =>
            scrollArea.scrollToEdge({ edge: "bottom", behavior: "smooth" })
          }
        >
          Scroll to bottom
        </Button>
        <Button
          onClick={() =>
            scrollArea.scrollToEdge({ edge: "top", behavior: "smooth" })
          }
        >
          Scroll to top
        </Button>
      </ButtonGroup>

      <ScrollArea.RootProvider value={scrollArea} height="8rem" width="24rem">
        <ScrollArea.Viewport>
          <ScrollArea.Content>
            <LoremIpsum p={3} />
          </ScrollArea.Content>
        </ScrollArea.Viewport>

        <ScrollArea.Scrollbar />
      </ScrollArea.RootProvider>
    </Stack>
  )
}
