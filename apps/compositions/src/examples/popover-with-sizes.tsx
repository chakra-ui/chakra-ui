import {
  Button,
  For,
  Input,
  Popover,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react"

export const PopoverWithSizes = () => {
  return (
    <Stack align="center" direction="row" gap="10">
      <For each={["xs", "sm", "md", "lg"]}>
        {(size) => (
          <Popover.Root key={size} size={size}>
            <Popover.Trigger asChild>
              <Button size={size} variant="outline">
                Click me
              </Button>
            </Popover.Trigger>
            <Portal>
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.Arrow />
                  <Popover.Body>
                    <Popover.Title fontWeight="medium">
                      Naruto Form
                    </Popover.Title>
                    <Text my="4">
                      Naruto is a Japanese manga series written and illustrated
                      by Masashi Kishimoto.
                    </Text>
                    <Input placeholder="Your fav. character" size={size} />
                  </Popover.Body>
                </Popover.Content>
              </Popover.Positioner>
            </Portal>
          </Popover.Root>
        )}
      </For>
    </Stack>
  )
}
