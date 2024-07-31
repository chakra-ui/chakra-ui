import { FormatByte, Stack, Text } from "@chakra-ui/react"

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
