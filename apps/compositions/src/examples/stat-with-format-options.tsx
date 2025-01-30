import { FormatNumber, Stat } from "@chakra-ui/react"

export const StatWithFormatOptions = () => {
  return (
    <Stat.Root>
      <Stat.Label>Revenue</Stat.Label>
      <Stat.ValueText>
        <FormatNumber value={935.4} style="currency" currency="USD" />
      </Stat.ValueText>
    </Stat.Root>
  )
}
