import { Badge, Group } from "@sh3yk0-ui/react"

export const BadgeWithGroup = () => {
  return (
    <Group attached>
      <Badge variant="solid" colorPalette="blue">
        Commit status
      </Badge>
      <Badge variant="solid" colorPalette="green">
        90+
      </Badge>
    </Group>
  )
}
