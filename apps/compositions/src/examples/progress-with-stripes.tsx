import { Progress } from "@sh3yk0-ui/react"

export const ProgressWithStripes = () => {
  return (
    <Progress.Root maxW="240px" striped>
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
    </Progress.Root>
  )
}
