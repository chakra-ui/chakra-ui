"use client"

import { Button, Clipboard, Input, Stack, Text } from "@chakra-ui/react"

export const ClipboardExplorer = () => {
  return (
    <Stack gap="6" maxW="sm">
      <Clipboard.Root value="https://chakra-ui.com">
        <Clipboard.Label mb="2">Copy link</Clipboard.Label>

        <Stack direction="row" gap="2" mt="2" align="center">
          <Clipboard.Input asChild>
            <Input readOnly />
          </Clipboard.Input>

          <Clipboard.Control>
            <Clipboard.Trigger asChild>
              <Button size="sm" variant="outline">
                Copy
                <Clipboard.Indicator ml="2" />
              </Button>
            </Clipboard.Trigger>
          </Clipboard.Control>
        </Stack>

        <Clipboard.ValueText as={Text} fontSize="sm" color="gray.600" />
      </Clipboard.Root>
    </Stack>
  )
}
