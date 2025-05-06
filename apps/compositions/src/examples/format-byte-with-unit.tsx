import { FormatByte, Text } from "@sh3yk0-ui/react"

export const FormatByteWithUnit = () => {
  return (
    <Text textStyle="lg">
      File size: <FormatByte value={1450.45} unit="bit" />
    </Text>
  )
}
