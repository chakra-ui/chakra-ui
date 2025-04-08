import { Progress, Stack } from "@chakra-ui/react"

export const ProgressWithVariants = () => {
  return (
    <Stack gap="4" maxW="240px">
      <Progress.Root variant="subtle">
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
      <Progress.Root variant="outline">
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
    </Stack>
  )
}
