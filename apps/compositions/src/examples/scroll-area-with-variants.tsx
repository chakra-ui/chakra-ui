import { For, ScrollArea, Stack, Text } from "@chakra-ui/react"
import Lorem from "react-lorem-ipsum"

export const ScrollAreaWithVariants = () => (
  <Stack gap="8" maxW="lg">
    <For each={["hover", "always"]}>
      {(variant) => (
        <Stack gap="2" key={variant}>
          <Text fontWeight="medium">variant="{variant}"</Text>
          <ScrollArea.Root height="8rem" variant={variant}>
            <ScrollArea.Viewport>
              <ScrollArea.Content paddingEnd="3" textStyle="sm">
                <Lorem p={4} />
              </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar />
          </ScrollArea.Root>
        </Stack>
      )}
    </For>
  </Stack>
)
