import { Badge, ColorSwatch } from "@chakra-ui/react"

export const ColorSwatchWithBadge = () => {
  return (
    <Badge>
      <ColorSwatch value="#bada55" boxSize="0.82em" />
      #bada55
    </Badge>
  )
}
