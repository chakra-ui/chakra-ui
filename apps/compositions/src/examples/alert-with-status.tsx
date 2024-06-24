import { For, Stack, Text } from "@chakra-ui/react"
import { Alert } from "compositions/ui/alert"

export const AlertWithStatus = () => {
  return (
    <Stack gap="2" align="flex-start">
      <For each={["info", "warning", "success", "error"]}>
        {(status) => (
          <Stack
            align="center"
            key={status}
            direction="row"
            gap="10"
            px="4"
            width="full"
          >
            <Text minW="8ch">{status}</Text>
            <Stack flex="1">
              <Alert status={status} title="This is the alert title" />
              <Alert status={status} title="This is the alert title" flex="1">
                This is the alert description
              </Alert>
            </Stack>
          </Stack>
        )}
      </For>
    </Stack>
  )
}
