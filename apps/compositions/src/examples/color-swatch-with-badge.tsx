import { Badge, ColorSwatch } from "@sh3yk0-ui/react"

export const ColorSwatchWithBadge = () => {
  return (
    <Badge>
      <ColorSwatch value="#bada55" boxSize="0.82em" />
      #bada55
    </Badge>
  )
}
