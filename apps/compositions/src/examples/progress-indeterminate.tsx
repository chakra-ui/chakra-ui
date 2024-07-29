import { ProgressBar, ProgressRoot } from "compositions/ui/progress"

export const ProgressIndeterminate = () => {
  return (
    <ProgressRoot maxW="240px" value={null}>
      <ProgressBar />
    </ProgressRoot>
  )
}
