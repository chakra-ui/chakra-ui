import { Center, For, Stack } from "@sh3yk0-ui/react"

export const TokensFocusRing = () => {
  return (
    <Stack gap="4">
      <For each={["inside", "outside", "mixed"]}>
        {(focusRing) => (
          <Center
            h="20"
            bg="bg"
            borderWidth="1px"
            focusRing={focusRing}
            data-focus
          >
            {focusRing}
          </Center>
        )}
      </For>
    </Stack>
  )
}
