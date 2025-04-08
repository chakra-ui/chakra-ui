import { For, Progress, Stack } from "@chakra-ui/react"

export const ProgressWithSizes = () => {
  return (
    <Stack gap="4" maxW="240px">
      <For each={["xs", "sm", "md", "lg"]}>
        {(size) => (
          <Progress.Root key={size} size={size}>
            <Progress.Track>
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>
        )}
      </For>
    </Stack>
  )
}
