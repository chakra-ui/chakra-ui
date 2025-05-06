import { FormatNumber, Text } from "@sh3yk0-ui/react"

export const FormatNumberWithCurrency = () => {
  return (
    <Text textStyle="lg">
      <FormatNumber value={1234.45} style="currency" currency="USD" />
    </Text>
  )
}
