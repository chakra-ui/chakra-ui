import { ColorSwatch, Group } from "@chakra-ui/react"

export const ColorSwatchPalette = () => {
  return (
    <Group attached width="full" maxW="sm" grow>
      {swatches.map((color) => (
        <ColorSwatch key={color} value={color} size="2xl" />
      ))}
    </Group>
  )
}

const swatches = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"]
