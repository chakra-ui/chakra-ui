import { FormatNumber, Text } from "@chakra-ui/react"

export const FormatNumberWithCompact = () => {
  return (
    <Text textStyle="lg">
      <FormatNumber value={1500000} notation="compact" compactDisplay="short" />
    </Text>
  )
}
