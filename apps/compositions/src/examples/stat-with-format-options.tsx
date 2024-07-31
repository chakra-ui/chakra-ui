import { StatLabel, StatRoot, StatValueText } from "compositions/ui/stat"

export const StatWithFormatOptions = () => {
  return (
    <StatRoot>
      <StatLabel>Revenue</StatLabel>
      <StatValueText
        value={935.4}
        formatOptions={{ style: "currency", currency: "USD" }}
      />
    </StatRoot>
  )
}
