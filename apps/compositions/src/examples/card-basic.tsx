import { Card, Group, Heading, Text } from "@chakra-ui/react"
import { Avatar } from "compositions/ui/avatar"
import { Button } from "compositions/ui/button"

export const CardBasic = () => {
  return (
    <Card.Root width="320px">
      <Card.Body>
        <Avatar
          src="https://picsum.photos/200/300"
          name="Nue Camp"
          size="lg"
          shape="rounded"
        />
        <Heading size="lg" mt="4" mb="2">
          Nue Camp
        </Heading>
        <Text color="fg.muted">
          This is the card body. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
          Curabitur nec odio vel dui euismod fermentum.
        </Text>
      </Card.Body>
      <Card.Footer>
        <Group justify="flex-end" width="full">
          <Button variant="outline">View</Button>
          <Button>Join</Button>
        </Group>
      </Card.Footer>
    </Card.Root>
  )
}
