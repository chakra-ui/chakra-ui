import { For, ScrollArea, Stack, Text } from "@chakra-ui/react"
import LoremIpsum from "react-lorem-ipsum"

export const ScrollAreaWithSizes = () => (
  <Stack gap="8" maxW="lg">
    <For each={["xs", "sm", "md", "lg"]}>
      {(size) => (
        <Stack gap="2" key={size}>
          <Text fontWeight="medium">size="{size}"</Text>
          <ScrollArea.Root size={size} height="8rem" variant="always">
            <ScrollArea.Viewport>
              <ScrollArea.Content paddingEnd="5" textStyle="sm">
                <LoremIpsum p={2} />
              </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar />
          </ScrollArea.Root>
        </Stack>
      )}
    </For>
  </Stack>
)
