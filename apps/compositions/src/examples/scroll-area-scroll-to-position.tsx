"use client"

import { Button, ScrollArea, Stack, useScrollArea } from "@chakra-ui/react"
import LoremIpsum from "react-lorem-ipsum"

export const ScrollAreaScrollToPosition = () => {
  const scrollArea = useScrollArea()
  return (
    <Stack gap="8" align="flex-start" maxW="xl">
      <Button
        variant="outline"
        size="sm"
        onClick={() => scrollArea.scrollTo({ top: 200, behavior: "smooth" })}
      >
        Scroll to 100px
      </Button>
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
