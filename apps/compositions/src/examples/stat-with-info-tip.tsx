import { StatLabel, StatRoot, StatValueText } from "compositions/ui/stat"

export const StatWithInfoTip = () => {
  return (
    <StatRoot>
      <StatLabel info="Some info">Unique </StatLabel>
      <StatValueText>192.1k</StatValueText>
    </StatRoot>
  )
}
