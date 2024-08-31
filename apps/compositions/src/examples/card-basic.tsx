import { Card, Heading, Text } from "@chakra-ui/react"
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
        <Text color="fg.subtle">
          This is the card body. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
          Curabitur nec odio vel dui euismod fermentum.
        </Text>
      </Card.Body>
      <Card.Footer justifyContent="flex-end" gap="2">
        <Button variant="outline">View</Button>
        <Button>Join</Button>
      </Card.Footer>
    </Card.Root>
  )
}
