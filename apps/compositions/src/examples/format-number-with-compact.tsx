import { FormatNumber, Text } from "@sh3yk0-ui/react"

export const FormatNumberWithCompact = () => {
  return (
    <Text textStyle="lg">
      <FormatNumber value={1500000} notation="compact" compactDisplay="short" />
    </Text>
  )
}
