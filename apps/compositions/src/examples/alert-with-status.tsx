import { For, HStack, Stack, Text } from "@chakra-ui/react"
import { Alert } from "compositions/ui/alert"

export const AlertWithStatus = () => {
  return (
    <Stack gap="2" width="full">
      <For each={["info", "warning", "success", "error"]}>
        {(status) => (
          <HStack key={status} gap="10" width="full">
            <Text minW="8ch">{status}</Text>
            <Stack flex="1">
              <Alert status={status} title="This is the alert title" />
              <Alert status={status} title="This is the alert title" flex="1">
                This is the alert description
              </Alert>
            </Stack>
          </HStack>
        )}
      </For>
    </Stack>
  )
}
