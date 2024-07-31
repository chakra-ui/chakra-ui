import { ProgressBar, ProgressRoot } from "compositions/ui/progress"
import {
  StatHelpText,
  StatLabel,
  StatRoot,
  StatValueText,
} from "compositions/ui/stat"

export const StatWithProgressBar = () => {
  return (
    <StatRoot maxW="240px">
      <StatLabel>This week</StatLabel>
      <StatValueText
        value={1340}
        formatOptions={{
          currency: "USD",
          style: "currency",
          maximumFractionDigits: 0,
        }}
      />
      <StatHelpText mb="2">+12% from last week</StatHelpText>
      <ProgressRoot>
        <ProgressBar />
      </ProgressRoot>
    </StatRoot>
  )
}
