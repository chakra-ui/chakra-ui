import { Badge, FormatNumber, HStack, Stat } from "@chakra-ui/react"

export const StatWithTrend = () => {
  return (
    <Stat.Root>
      <Stat.Label>Unique </Stat.Label>
      <HStack>
        <Stat.ValueText>
          <FormatNumber value={8456.4} style="currency" currency="USD" />
        </Stat.ValueText>
        <Badge colorPalette="green" gap="0">
          <Stat.UpIndicator />
          12%
        </Badge>
      </HStack>
      <Stat.HelpText>since last month</Stat.HelpText>
    </Stat.Root>
  )
}
