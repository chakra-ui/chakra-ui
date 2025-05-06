import { FormatByte, Text } from "@sh3yk0-ui/react"

export const FormatByteBasic = () => {
  return (
    <Text textStyle="lg">
      File size: <FormatByte value={1450.45} />
    </Text>
  )
}
