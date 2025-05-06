import { Progress } from "@sh3yk0-ui/react"

export const ProgressBasic = () => {
  return (
    <Progress.Root maxW="240px">
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
    </Progress.Root>
  )
}
