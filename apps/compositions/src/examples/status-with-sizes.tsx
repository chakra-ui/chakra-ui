import { For, HStack, Stack } from "@chakra-ui/react"
import { Status } from "compositions/ui/status"

export const StatusWithSizes = () => {
  return (
    <Stack gap="2" align="flex-start">
      <For each={["sm", "md", "lg"]}>
        {(size) => (
          <HStack key={size} gap="10" px="4">
            <Status size={size} width="100px" value="warning">
              In Review
            </Status>
            <Status size={size} width="100px" value="error">
              Error
            </Status>
            <Status size={size} width="100px" value="success">
              Approved
            </Status>
          </HStack>
        )}
      </For>
    </Stack>
  )
}
