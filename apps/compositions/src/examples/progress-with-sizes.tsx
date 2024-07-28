import { Stack } from "@chakra-ui/react"
import { ProgressBar, ProgressRoot } from "compositions/ui/progress"

export const ProgressWithSizes = () => {
  return (
    <Stack gap="4" maxW="240px">
      <ProgressRoot size="xs">
        <ProgressBar />
      </ProgressRoot>
      <ProgressRoot size="sm">
        <ProgressBar />
      </ProgressRoot>
      <ProgressRoot size="md">
        <ProgressBar />
      </ProgressRoot>
      <ProgressRoot size="lg">
        <ProgressBar />
      </ProgressRoot>
    </Stack>
  )
}
