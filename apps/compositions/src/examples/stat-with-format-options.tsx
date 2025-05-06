import { FormatNumber, Stat } from "@sh3yk0-ui/react"

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
