import { Badge, BadgeProps } from "@sh3yk0-ui/react"

export const StatusBadge = (props: BadgeProps) => (
  <Badge
    size="xs"
    textStyle="xs"
    variant="solid"
    colorPalette="teal"
    textTransform="capitalize"
    {...props}
  />
)
