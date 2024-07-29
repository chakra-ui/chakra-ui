import { ProgressBar, ProgressRoot } from "compositions/ui/progress"

export const ProgressWithStripes = () => {
  return (
    <ProgressRoot maxW="240px" striped>
      <ProgressBar />
    </ProgressRoot>
  )
}
