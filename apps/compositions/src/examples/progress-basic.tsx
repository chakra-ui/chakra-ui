import { ProgressBar, ProgressRoot } from "compositions/ui/progress"

export const ProgressBasic = () => {
  return (
    <ProgressRoot maxW="240px">
      <ProgressBar />
    </ProgressRoot>
  )
}
