import { ColorSwatch, HStack } from "@chakra-ui/react"

export const ColorSwatchWithAlpha = () => {
  return (
    <HStack>
      {colors.map((color) => (
        <ColorSwatch key={color} value={color} size="xl" />
      ))}
    </HStack>
  )
}

const colors = [
  "rgba(255, 0, 0, 0.5)",
  "rgba(0, 0, 255, 0.7)",
  "rgba(0, 255, 0, 0.4)",
  "rgba(255, 192, 203, 0.6)",
]
