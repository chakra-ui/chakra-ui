import { FormatByte, Stack, Text } from "@sh3yk0-ui/react"

export const FormatByteSizes = () => {
  return (
    <Stack>
      <Text textStyle="lg">
        <FormatByte value={50} />
      </Text>
      <Text textStyle="lg">
        <FormatByte value={5000} />
      </Text>
      <Text textStyle="lg">
        <FormatByte value={5000000} />
      </Text>
      <Text textStyle="lg">
        <FormatByte value={5000000000} />
      </Text>
    </Stack>
  )
}
