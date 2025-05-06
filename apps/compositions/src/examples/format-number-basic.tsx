import { FormatNumber, Text } from "@sh3yk0-ui/react"

export const FormatNumberBasic = () => {
  return (
    <Text textStyle="lg">
      <FormatNumber value={1450.45} />
    </Text>
  )
}
