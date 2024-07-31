import {
  StatLabel,
  StatRoot,
  StatValueText,
  StatValueUnit,
} from "compositions/ui/stat"

export const StatWithValueUnit = () => {
  return (
    <StatRoot>
      <StatLabel>Time to complete</StatLabel>
      <StatValueText alignItems="baseline">
        3 <StatValueUnit>hr</StatValueUnit>
        20 <StatValueUnit>min</StatValueUnit>
      </StatValueText>
    </StatRoot>
  )
}
