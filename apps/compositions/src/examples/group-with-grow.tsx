import { Button, Group } from "@sh3yk0-ui/react"

export const GroupWithGrow = () => {
  return (
    <Group grow>
      <Button variant="outline">First</Button>
      <Button variant="outline">Second</Button>
      <Button variant="outline">Third</Button>
    </Group>
  )
}
