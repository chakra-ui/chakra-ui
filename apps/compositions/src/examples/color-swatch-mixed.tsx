import { ColorSwatchMix, HStack } from "@chakra-ui/react"

export const ColorSwatchMixed = () => {
  return (
    <HStack>
      <ColorSwatchMix size="lg" items={["red", "pink"]} />
      <ColorSwatchMix size="lg" items={["red", "pink", "green"]} />
      <ColorSwatchMix
        size="lg"
        items={["lightgreen", "green", "darkgreen", "black"]}
      />
    </HStack>
  )
}
