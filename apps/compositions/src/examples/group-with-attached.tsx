import { Badge, Button, Group, Stack } from "@chakra-ui/react"

export const GroupWithAttached = () => {
  return (
    <Stack gap="4">
      <Group attached>
        <Button variant="outline">Item 1</Button>
        <Button variant="outline">Item 2</Button>
      </Group>

      <Group attached>
        <Badge variant="solid" colorPalette="purple">
          Commit status
        </Badge>
        <Badge variant="solid" colorPalette="green">
          90+
        </Badge>
      </Group>
    </Stack>
  )
}
