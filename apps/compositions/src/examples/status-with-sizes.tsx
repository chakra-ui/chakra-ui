import { For, HStack, Stack, Status } from "@chakra-ui/react"

export const StatusWithSizes = () => {
  return (
    <Stack gap="2" align="flex-start">
      <For each={["sm", "md", "lg"]}>
        {(size) => (
          <HStack key={size} gap="10" px="4">
            <Status.Root size={size} width="100px" colorPalette="orange">
              <Status.Indicator />
              In Review
            </Status.Root>
            <Status.Root size={size} width="100px" colorPalette="red">
              <Status.Indicator />
              Error
            </Status.Root>
            <Status.Root size={size} width="100px" colorPalette="green">
              <Status.Indicator />
              Approved
            </Status.Root>
          </HStack>
        )}
      </For>
    </Stack>
  )
}
