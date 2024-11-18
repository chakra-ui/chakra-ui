import { ColorSwatchMix, Stack } from "@chakra-ui/react"

export const ColorSwatchWithMix = () => {
  return (
    <Stack>
      <ColorSwatchMix size="lg" items={["red", "pink"]} />
      <ColorSwatchMix size="lg" items={["red", "pink", "green"]} />
      <ColorSwatchMix
        size="lg"
        items={["lightgreen", "green", "darkgreen", "black"]}
      />
    </Stack>
  )
}
