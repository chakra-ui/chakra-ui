import { HStack } from "@chakra-ui/react"
import {
  StatHelpText,
  StatLabel,
  StatRoot,
  StatUpTrend,
  StatValueText,
} from "compositions/ui/stat"

export const StatWithTrend = () => {
  return (
    <StatRoot>
      <StatLabel>Unique </StatLabel>
      <HStack>
        <StatValueText
          value={8456.4}
          formatOptions={{ style: "currency", currency: "USD" }}
        />
        <StatUpTrend>12%</StatUpTrend>
      </HStack>
      <StatHelpText>since last month</StatHelpText>
    </StatRoot>
  )
}
