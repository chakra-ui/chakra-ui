import { FormatByte, Stack, Text } from "@sh3yk0-ui/react"

export const FormatByteWithUnitDisplay = () => {
  return (
    <Stack>
      <Text textStyle="lg">
        <FormatByte value={50345.53} unitDisplay="narrow" />
      </Text>
      <Text textStyle="lg">
        <FormatByte value={50345.53} unitDisplay="short" />
      </Text>
      <Text textStyle="lg">
        <FormatByte value={50345.53} unitDisplay="long" />
      </Text>
    </Stack>
  )
}
