import { Badge, BadgePropsProvider, Group } from "@chakra-ui/react"

export const BadgeWithContext = () => {
  return (
    <BadgePropsProvider value={{ size: "sm", variant: "outline" }}>
      <Group>
        <Badge>Badge</Badge>
        <Badge variant="solid">Badge</Badge>
      </Group>
    </BadgePropsProvider>
  )
}
