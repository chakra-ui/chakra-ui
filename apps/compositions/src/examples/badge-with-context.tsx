import { Badge, BadgePropsProvider, Group } from "@chakra-ui/react"

export const BadgeWithContext = () => {
  return (
    <BadgePropsProvider value={{ size: "lg", variant: "outline" }}>
      <Group>
        <Badge>Badge</Badge>
        <Badge variant="solid">Badge</Badge>
      </Group>
    </BadgePropsProvider>
  )
}
