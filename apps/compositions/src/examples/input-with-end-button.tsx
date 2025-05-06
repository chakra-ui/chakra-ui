import { Button, Group, Input } from "@sh3yk0-ui/react"

export const InputWithEndButton = () => {
  return (
    <Group attached w="full" maxW="sm">
      <Input flex="1" placeholder="Enter your email" />
      <Button bg="bg.subtle" variant="outline">
        Submit
      </Button>
    </Group>
  )
}
