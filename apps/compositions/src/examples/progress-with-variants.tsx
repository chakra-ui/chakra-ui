import { Progress, Stack } from "@sh3yk0-ui/react"

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
