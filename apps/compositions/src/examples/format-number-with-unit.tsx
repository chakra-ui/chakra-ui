import { FormatNumber, Text } from "@sh3yk0-ui/react"

export const FormatNumberWithUnit = () => {
  return (
    <Text textStyle="lg">
      <FormatNumber value={384.4} style="unit" unit="kilometer" />
    </Text>
  )
}
