import { ColorSwatchMix, Stack, Text } from "@chakra-ui/react"

export const ColorSwatchWithMix = () => {
  return (
    <Stack>
      <Text>Mixed</Text>
      <ColorSwatchMix items={["red", "pink"]} />
      <ColorSwatchMix items={["lightgreen", "green", "darkgreen", "black"]} />
    </Stack>
  )
}
