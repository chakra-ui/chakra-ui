import { For, Stack } from "@chakra-ui/react"
import { ProgressBar, ProgressRoot } from "compositions/ui/progress"

export const ProgressWithSizes = () => {
  return (
    <Stack gap="2" align="flex-start">
      <For each={["sm", "md", "lg"]}>
        {(size) => (
          <ProgressRoot
            key={size}
            width="120px"
            defaultValue={40}
            variant="outline"
          >
            <ProgressBar />
          </ProgressRoot>
        )}
      </For>
    </Stack>
  )
}
