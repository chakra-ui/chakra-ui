import { Stack } from "@chakra-ui/react"
import { ProgressBar, ProgressRoot } from "compositions/ui/progress"

export const ProgressWithVariants = () => {
  return (
    <Stack gap="4" maxW="200px">
      <ProgressRoot variant="subtle">
        <ProgressBar />
      </ProgressRoot>
      <ProgressRoot variant="outline">
        <ProgressBar />
      </ProgressRoot>
    </Stack>
  )
}
