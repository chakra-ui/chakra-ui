import {
  StatDownTrend,
  StatLabel,
  StatRoot,
  StatValueText,
} from "compositions/ui/stat"

export const StatWithIndicator = () => {
  return (
    <StatRoot>
      <StatLabel>Unique visitors</StatLabel>
      <StatValueText>192.1k</StatValueText>
      <StatDownTrend variant="plain" px="0">
        1.9%
      </StatDownTrend>
    </StatRoot>
  )
}
